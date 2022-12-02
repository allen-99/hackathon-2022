from app import db
from book_scrolling.models.user import User
from book_scrolling.models.book import Book


class User_Book(db.Model):
    __tablename__ = "UserBook"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    book_id = db.Column(db.Integer, db.ForeignKey(Book.id))
    is_read = db.Column(db.Boolean)
    is_plan = db.Column(db.Boolean)


class Session_Tag(db.Model):
    __tablename__ = "SessionTag"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('User.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('Tag.id'))

    weight = db.Column(db.Integer)


class Session_Author(db.Model):
    __tablename__ = "SessionAuthor"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('Author.id'))

    weight = db.Column(db.Integer)


class Session_Genre(db.Model):
    __tablename__ = "SessionGenre"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('Genre.id'))

    weight = db.Column(db.Integer)
