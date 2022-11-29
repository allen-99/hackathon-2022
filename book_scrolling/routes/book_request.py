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


@book_req.route('/get_cards/<n>', methods=['POST'])
def get_card_batch(n):
    # Что нужно знать?
    #    Какие книги уже были (сессия) - обязательно
    #    Какие веса есть (сессия/бд)
    #    Какие жанры в выборке (сессия)

    result = []
    for i in range(int(n)):
        book_id = i
        tags = []
        select_tags = db.session.execute(select(Tag.name).join(Book_Tag).where(Book_Tag.book_id == book_id)).all()
        for sel in select_tags:
            tags.append(sel.name)
        authors = []
        select_authors = db.session.execute(select(Author.name).join(Book_Author).where(Book_Author.book_id == book_id)).all()
        for sel in select_authors:
            authors.append(sel.name)
        genres = []
        select_genres = db.session.execute(select(Genre.name).join(Book_Genre).where(Book_Genre.book_id == book_id)).all()
        for sel in select_genres:
            genres.append(sel.name)

        book = Book.query.filter_by(id=book_id).first()
        result.append({
            "title": book.title,
            "description": book.description,
            "link": book.link,
            "cover_url": book.cover_url,
            "authors": authors,
            "genres": genres,
            "tags": tags,
        })

    return jsonify(result)
