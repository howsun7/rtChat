from app import app 
from models import db, User

@app.cli.command('db_seed_user')
def db_seed_user():
	user = User(
		email='test2@email.com',
		password='testpwd'
	)
	db.session.add(user)
	db.session.commit()


