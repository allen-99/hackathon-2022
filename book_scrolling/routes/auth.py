import uuid
from flask_login import login_user, logout_user

from book_scrolling import db
from flask import Blueprint, render_template, redirect, url_for, request, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from book_scrolling.models.book import Book, Genre, Book_Genre, Book_Tag, Book_Author
from book_scrolling.models.user import User
from book_scrolling.models.session import User_Book, Session_Genre, Session_Tag, Session_Author


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET'])
def login():
    return jsonify({"answer": "login"})


@auth.route('/signup')
def signup():
    return jsonify({"answer": "signup"})


@auth.route('/signup', methods=['POST'])
def signup_post():
    data = request.get_json()

    email = data['email']
    password = data['password']
    name = data['name']

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"answer": "This email already exists"})

    new_user = User(id=str(uuid.uuid4()),
                    name=name,
                    email=email,
                    password=generate_password_hash(password, method='sha256'),
                    remember=False)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"answer": "auth successful"})


@auth.route('/login', methods=['POST'])
def login_post():
    data = request.get_json()

    email = data['email']
    password = data['password']

    remember = True if data['remember'] else False

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return jsonify({"answer": "login failed"})

    login_user(user, remember=remember)
    return jsonify({"answer": "login successful"})


@auth.route('/logout')
def logout():
    logout_user()
    return jsonify({"answer": "user logout"})
