from flask import Blueprint, redirect, url_for, request
from flask_login import login_required, current_user

from book_scrolling.models.book import Book, Genre, Book_Genre, Book_Tag, Book_Author
from book_scrolling.models.user import User
from book_scrolling.models.session import User_Book, Session_Genre, Session_Tag, Session_Author

book_wall = Blueprint('book_wall', __name__)


