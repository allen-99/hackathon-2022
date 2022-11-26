from app import db
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError


class User(UserMixin, db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    remember = db.Column(db.Boolean)


class LoginForm(FlaskForm):
    username = StringField(
        validators=[InputRequired(), Length(min=5, max=80)],
        render_kw={"placeholder": "email"},
    )

    password = PasswordField(
        validators=[InputRequired(), Length(min=5, max=80)],
        render_kw={"placeholder": "password"},
    )
    submit = SubmitField("Login")


class RegisterForm(FlaskForm):
    login = StringField(
        validators=[InputRequired(), Length(min=4, max=80)],
        render_kw={"placeholder": "email"},
    )

    name = PasswordField(
        validators=[InputRequired(), Length(min=8, max=80)],
        render_kw={"placeholder": "name"},
    )

    password = PasswordField(
        validators=[InputRequired(), Length(min=8, max=80)],
        render_kw={"placeholder": "password"},
    )

    submit = SubmitField("Register")

    def validate_check(self, login):
        existing_user_username = User.query.filter_by(login=login.data).first()
        if existing_user_username:
            raise ValidationError(
                "That email already exists. Please choose a different one."
            )


