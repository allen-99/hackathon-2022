from app import db
from book_scrolling.models.user import User


class User_Book(db.Model):
    __tablename__ = "UserBook"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    is_read = db.Column(db.Boolean)
    is_plan = db.Column(db.Boolean)


class Session_Tag(db.Model):
    __tablename__ = "SessionTag"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))

    weight = db.Column(db.Integer)


class Session_Author(db.Model):
    __tablename__ = "SessionAuthor"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))

    weight = db.Column(db.Integer)


class Session_Genre(db.Model):
    __tablename__ = "SessionGenre"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'))

    weight = db.Column(db.Integer)
