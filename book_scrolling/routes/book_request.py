import enum
import uuid
from flask_login import login_user, logout_user
from sqlalchemy import select

from book_scrolling import db
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from book_scrolling.models.book import Book, Genre, Book_Genre, Book_Tag, Book_Author, Tag, Genre, Author
from book_scrolling.models.user import User
from book_scrolling.models.session import User_Book, Session_Genre, Session_Tag, Session_Author

book_req = Blueprint('book_req', __name__)


@book_req.route('/get_cards/<int:n>', methods=['POST'])
def get_card_batch(n):
    result = []
    for i in range(int(n)):
        book_id = i
        result.append(get_book_dict_by_id(book_id))
    return jsonify(result)


def get_book_dict_by_id(book_id: int):
    tags = []
    select_tags = db.session.execute(select(Tag.name).join(Book_Tag).where(Book_Tag.book_id == book_id)).all()
    for sel in select_tags:
        tags.append(sel.name)
    authors = []
    select_authors = db.session.execute(
        select(Author.name).join(Book_Author).where(Book_Author.book_id == book_id)).all()
    for sel in select_authors:
        authors.append(sel.name)
    genres = []
    select_genres = db.session.execute(
        select(Genre.name).join(Book_Genre).where(Book_Genre.book_id == book_id)).all()
    for sel in select_genres:
        genres.append(sel.name)

    book = Book.query.filter_by(id=book_id).first()
    return {
        "title": book.title,
        "description": book.description,
        "link": book.link,
        "cover_url": book.cover_url,
        "authors": authors,
        "genres": genres,
        "tags": tags,
    }


class CardType(enum.Enum):
    book = 1
    genre = 2
    tag = 3
    author = 4


# session
# - name = string : {
# - - already_seen = set(book_id, book_id, ...)
# - - queue = [(card_id, CardType), (card_id, CardType), ...] }


sessions = dict()


@book_req.route('/get_cards', methods=['POST'])
def get_card_queue():
    params = request.get_json()
    name = params['name']

    if name not in sessions.keys():
        queue_json = start_queue(name)
    else:
        update_weights(params)
        update_already_seen(params)
        queue_json = update_queue(name)

    return queue_json


def update_weights(json):
    queue_info = sessions[json['name']]['queue']
#   ужасно неоптимизированный запрос


def update_already_seen(json):
    name = json['name']
    queue_info = sessions[name]['queue']
    for queue_index in json['yes'] + json['no'] + json['save']:
        if queue_info[queue_index][1] == CardType.book:
            sessions[name]['already_seen'].add(queue_info[queue_index][0])


def update_queue(name):
    n = 5
    seen_set = sessions[name]['already_seen']
    # select id form book where id not in
    books = Book.query.filter(Book.id.not_in(seen_set)).limit(n).all()
    sessions[name]['queue'] = []
    selected_books = []
    for book in books:
        book_id = book.id
        sessions[name]['queue'].append((book_id, CardType.book))
        selected_books.append(get_book_dict_by_id(book_id))

    return jsonify(selected_books)


def start_queue(name):
    sessions[name] = {
        'already_seen': set(),
        'queue': [],
    }
    selected_books = []
    for book_id in range(5):
        sessions[name]['queue'].append((book_id, CardType.book))
        selected_books.append(get_book_dict_by_id(book_id))

    return jsonify(selected_books)


@book_req.route('/reset_session/<string:name>', methods=['POST'])
def reset_session(name):
    sessions.pop(name, None)
    return f"{name}, you're clean"