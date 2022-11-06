from app import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class CommonModelOperation:
	@classmethod
	def instance_exists(cls, **kwargs):
		return cls.query.filter_by(**kwargs).count() > 0

class User(db.Model, CommonModelOperation):
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(40), unique=True, nullable=False)
	password = db.Column(db.String(80), nullable=False)

	def __repr__(self):
		return f'{self.id: self.email}'