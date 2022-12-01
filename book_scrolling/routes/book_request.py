import enum

from flask import Blueprint, request, jsonify
from sqlalchemy import select

from book_scrolling import db
from book_scrolling.models.book import Book, Book_Genre, Book_Tag, Book_Author, Tag, Genre, Author

book_req = Blueprint('book_req', __name__)


@book_req.route('/get_cards/<int:n>', methods=['POST'])
def get_card_batch(n):
    result = []
    for i in range(int(n)):
        book_id = i
        result.append(get_book_dict_by_id(book_id))
    return jsonify(result)


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
        self.queue_info = []
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
            self.queue_info.append((book_id, CardType.book, {
                'genres': book_info['genres'],
                'tags': book_info['tags'],
                'authors': book_info['authors']
            }))
            selected_books.append(book_info)
        self.queue = selected_books

    def update_weights(self, json):
        for yes_answer_index in json['yes']:
            for genre in self.queue_info[yes_answer_index][2]['genres']:
                print(f'yes -> {genre}')
            for author in self.queue_info[yes_answer_index][2]['authors']:
                print(f'yes -> {author}')
            for tag in self.queue_info[yes_answer_index][2]['tags']:
                print(f'yes -> {tag}')
        for no_answer_index in json['no']:
            for genre in self.queue_info[no_answer_index][2]['genres']:
                print(f'no -> {genre}')
            for author in self.queue_info[no_answer_index][2]['authors']:
                print(f'no -> {author}')
            for tag in self.queue_info[no_answer_index][2]['tags']:
                print(f'no -> {tag}')
        for save_answer_index in json['save']:
            for genre in self.queue_info[save_answer_index][2]['genres']:
                print(f'save -> {genre}')
            for author in self.queue_info[save_answer_index][2]['authors']:
                print(f'save -> {author}')
            for tag in self.queue_info[save_answer_index][2]['tags']:
                print(f'save -> {tag}')
    #   ужасно неоптимизированный запрос

    def update_already_seen(self, json):
        for queue_index in json['yes'] + json['no'] + json['save']:
            if self.queue_info[queue_index][1] == CardType.book:
                self.already_seen.add(self.queue_info[queue_index][0])

    def update_queue(self):
        n = 5
        books = Book.query.filter(Book.id.not_in(self.already_seen)).limit(n).all()
        self.queue_info = []
        selected_books = []
        for book in books:
            book_id = book.id
            book_info = get_book_dict_by_id(book_id)
            self.queue_info.append((book_id, CardType.book, {
                'genres': book_info['genres'],
                'tags': book_info['tags'],
                'authors': book_info['authors']
            }))
            selected_books.append(book_info)
        self.queue = selected_books


@book_req.route('/get_cards', methods=['POST'])
def get_card_queue():
    params = request.get_json()
    name = params['name']
    session = get_session(name)

    if len(session.queue) != 0:
        queue_json = jsonify(session.queue)
    else:
        # session.update_weights(params)
        session.update_already_seen()
        session.update_queue()
        queue_json = jsonify(session.queue)

    return queue_json


@book_req.route('/reset_session/<string:name>', methods=['POST'])
def reset_session(name):
    sessions.pop(name, None)
    return f"{name}, you're clean"
