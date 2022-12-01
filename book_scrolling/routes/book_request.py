import enum

from flask import Blueprint, request, jsonify
from sqlalchemy import select

from book_scrolling import db
from book_scrolling.models.book import Book, Book_Genre, Book_Tag, Book_Author, Tag, Genre, Author

book_req = Blueprint('book_req', __name__)


def get_book_dict_by_id(book_id: int):
    tags = {}
    select_tags = db.session.execute(
        select(Tag.name, Tag.id).join(Book_Tag).where(Book_Tag.book_id == book_id)).all()
    for sel in select_tags:
        tags[sel.id] = sel.name
    authors = {}
    select_authors = db.session.execute(
        select(Author.name, Author.id).join(Book_Author).where(Book_Author.book_id == book_id)).all()
    for sel in select_authors:
        authors[sel.id] = sel.name
    genres = {}
    select_genres = db.session.execute(
        select(Genre.name, Genre.id).join(Book_Genre).where(Book_Genre.book_id == book_id)).all()
    for sel in select_genres:
        genres[sel.id] = sel.name

    book = Book.query.filter_by(id=book_id).first()
    return {
        "id": book_id,
        "title": book.title,
        "description": book.description,
        "link": book.link,
        "cover_url": book.cover_url,
        "authors": authors,
        "genres": genres,
        "tags": tags,
        "card_type": CardType.book
    }


class CardType(enum.IntEnum):
    book = 1
    bonus = 2


@book_req.route('/test', methods=['POST'])
def test_pd():
    session = SwipeSession('tester')
    print(session.queue)
    return '200'


sessions = dict()


def get_session(name: str):
    if name not in sessions.keys():
        sessions[name] = SwipeSession(name)
    return sessions[name]


class SwipeSession:
    def __init__(self, username):
        self.username = username
        self.already_seen = set()
        self.author_weights = dict()
        self.genre_weights = dict()
        self.tag_weights = dict()
        self.queue = None
        self.initialize_queue()

    def initialize_queue(self):
        # Надо потом делать это бонусами
        selected_books = []
        for book_id in range(5):
            book_info = get_book_dict_by_id(book_id)
            selected_books.append(book_info)
        self.queue = selected_books

    def update_weights(self, json):
        pass

    def update_already_seen(self):
        for seen_card in self.queue:
            if seen_card['card_type'] == CardType.book:
                self.already_seen.add(seen_card['id'])

    def update_queue(self, n=5):
        books = Book.query.filter(Book.id.not_in(self.already_seen)).limit(n).all()
        selected_books = []
        for book in books:
            book_id = book.id
            book_info = get_book_dict_by_id(book_id)
            selected_books.append(book_info)
        self.queue = selected_books


@book_req.route('/get_cards', defaults={'n': 5}, methods=['POST'])
@book_req.route('/get_cards/<n>', methods=['POST'])
def get_card_queue(n):
    params = request.get_json()
    name = params['name']
    session = get_session(name)
    print('aaa')
    if len(params) == 1:
        queue_json = jsonify(session.queue)
    else:
        # session.update_weights(params)
        session.update_already_seen()
        session.update_queue(n)
        queue_json = jsonify(session.queue)

    return queue_json


@book_req.route('/reset_session/<string:name>', methods=['POST'])
def reset_session(name):
    sessions.pop(name, None)
    return f"{name}, you're clean"
