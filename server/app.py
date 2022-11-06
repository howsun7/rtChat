'''server/app.py - main api app declaration'''
import os
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
basedir = os.path.abspath(os.path.dirname(__file__))

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['JWT_SECRET_KEY'] = 'iambadsecretchangeme'


from models import db, User
from serializers import user_schema, users_schema
import commands


migrate = Migrate(app, db)
jwt = JWTManager(app)

##
# API routes
##

@app.route('/api/user/register', methods=['POST'])
def user_signup():
    data = request.get_json()
    user_email = data.get('email')
    user_pwd = data.get('password')
    
    if not user_email or not user_pwd:
        return jsonify(msg='data incomplete'), 401

    # TODO: check if user with the same email exists

    new_user = User(email=user_email, password=user_pwd)
    db.session.add(new_user)
    db.session.commit()
    result = user_schema.dump(new_user)
    return jsonify(result), 201

@app.route('/api/user/login', methods=['POST'])
def user_login():
    data = request.get_json()
    user_email = data.get('email')
    user_pwd = data.get('password')

    if not User.instance_exists(email=user_email):
        return jsonify(msg='user does not exist!'), 401

    user = User.query.filter_by(email=user_email).first()
    if user.password != user_pwd :
        return jsonify(msg='wrong password! try again!'), 401

    access_token = create_access_token(identity=user_email) 
    return jsonify(token=access_token)


@app.route('/api/items')
def items():
  '''Sample API route for data'''
  return jsonify([{'title': 'A'}, {'title': 'B'}])


##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')

