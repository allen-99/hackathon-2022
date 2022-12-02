import enum

from flask import Blueprint, request, jsonify
from sqlalchemy import select, func

from book_scrolling import db
from book_scrolling.models.book import Book, Book_Genre, Book_Tag, Book_Author, Tag, Genre, Author, BonusCard
from book_scrolling.models.session import User_Book

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
    return '200'


sessions = dict()


def get_session(name: str):
    if name not in sessions.keys():
        sessions[name] = SwipeSession(name)
    return sessions[name]


class SwipeSession:
    CARS_TO_BONUS = 10

    def __init__(self, username):
        self.username = username
        self.already_seen_book = set()
        self.already_seen_bonus = set()
        self.author_weights = dict()
        self.genre_weights = dict()
        self.tag_weights = dict()
        self.queue = None
        self.current_cards_to_bonus = self.CARS_TO_BONUS
        self.initialize_queue()

    def initialize_queue(self):
        n = 5
        bonuses = db.session.execute(
            select(BonusCard.id, BonusCard.title, BonusCard.cover_url)
            .where(BonusCard.id.not_in(self.already_seen_bonus))
            .order_by(func.random())
            .limit(n)
        ).all()
        bonuses_json = []
        for bonus in bonuses:
            book_info = {
                "id": bonus[0],
                "title": bonus[1],
                "cover_url": bonus[2],
                "card_type": CardType.bonus
            }
            bonuses_json.append(book_info)
        self.queue = bonuses_json

    def update_weights(self, json):
        pass

    def update_already_seen(self):
        for seen_card in self.queue:
            if seen_card['card_type'] == CardType.book:
                self.already_seen_book.add(seen_card['id'])
            if seen_card['card_type'] == CardType.bonus:
                self.already_seen_bonus.add(seen_card['id'])

    def update_queue(self, n=5):
        books, authors, genres, tags = self.get_recommended_books(n)
        selected_books = []
        for i, book in enumerate(books):
            selected_books.append({
                "id": book[0],
                "title": book[1],
                "description": book[2],
                "link": book[3],
                "cover_url": book[4],
                "authors": authors[i],
                "genres": genres[i],
                "tags": tags[i],
                "card_type": CardType.book
            })
            self.current_cards_to_bonus -= 1
        self.try_add_bonus(selected_books)
        self.queue = selected_books

    def get_recommended_books(self, n=5):

        books = db.session.execute(
            select(Book.id, Book.title, Book.description, Book.link, Book.cover_url)
            .where(Book.id.not_in(self.already_seen_book))
            .order_by(func.random())
            .limit(n)
        ).all()

        books_authors = []
        books_genres = []
        books_tags = []
        for book in books:
            book_id = book[0]
            tags = {}
            select_tags = db.session.execute(
                select(Tag.name, Tag.id).join(Book_Tag).where(Book_Tag.book_id == book_id)).all()
            for sel in select_tags:
                tags[sel.id] = sel.name
            books_tags.append(tags)
            authors = {}
            select_authors = db.session.execute(
                select(Author.name, Author.id).join(Book_Author).where(Book_Author.book_id == book_id)).all()
            for sel in select_authors:
                authors[sel.id] = sel.name
            books_authors.append(authors)
            genres = {}
            select_genres = db.session.execute(
                select(Genre.name, Genre.id).join(Book_Genre).where(Book_Genre.book_id == book_id)).all()
            for sel in select_genres:
                genres[sel.id] = sel.name
            books_genres.append(genres)

        return books, books_authors, books_genres, books_tags

    def try_add_bonus(self, selected_books):
        if self.current_cards_to_bonus <= 0:
            bonus = db.session.execute(
                select(BonusCard.id, BonusCard.title, BonusCard.cover_url)
                .where(BonusCard.id.not_in(self.already_seen_bonus))
                .order_by(func.random())
            ).first()
            if bonus is not None:
                selected_books.append({
                    "id": bonus[0],
                    "title": bonus[1],
                    "cover_url": bonus[2],
                    "card_type": CardType.bonus
                })
            self.current_cards_to_bonus = self.CARS_TO_BONUS


@book_req.route('/get_cards', defaults={'n': 5}, methods=['POST'])
@book_req.route('/get_cards/<n>', methods=['POST'])
def get_card_queue(n):
    params = request.get_json()
    name = params['name']
    session = get_session(name)
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


@book_req.route('/save_book/<int:book_id>', methods=['POST'])
def save_book(book_id):
    save = User_Book(user_id=1, book_id=book_id)
    db.session.add(save)
    db.session.commit()
    return 'Ok'


@book_req.route('/get_savings', methods=['GET'])
def get_savings():
    books = User_Book.query.all()
    savings = []
    for book in books:
        savings.append(get_book_dict_by_id(book.book_id))
    return jsonify(savings)


@book_req.route('/delete_save/<int:book_id>', methods=['DELETE'])
def delete_save(book_id):
    User_Book.query.filter_by(user_id=1, book_id=book_id).delete()
    db.session.commit()
    return 'Ok'
