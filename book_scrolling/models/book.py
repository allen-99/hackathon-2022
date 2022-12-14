from app import db


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    min_age = db.Column(db.Integer)
    year = db.Column(db.Integer)
    link = db.Column(db.String)
    cover_url = db.Column(db.String)


class Genre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class Book_Genre(db.Model):
    __tablename__ = "BookGenre"
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    genre_id = db.Column(db.Integer,  db.ForeignKey('genre.id'))


class Book_Author(db.Model):
    __tablename__ = "BookAuthor"
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    author_id = db.Column(db.Integer,  db.ForeignKey('author.id'))


class Book_Tag(db.Model):
    __tablename__ = "BookTag"
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    tag_id = db.Column(db.Integer,  db.ForeignKey('tag.id'))


class BonusCard(db.Model):
    __tablename__ = "BonusCard"
    id = db.Column(db.Integer, primary_key=True)
    genre_id = db.Column(db.Integer)
    title = db.Column(db.String)
    cover_url = db.Column(db.String)
