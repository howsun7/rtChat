from app import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(40), unique=True, nullable=False)
	password = db.Column(db.String(80), nullable=False)

	def __repr__(self):
		return f'{self.id: self.email}'