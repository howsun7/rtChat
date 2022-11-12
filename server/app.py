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
from flask_socketio import SocketIO, emit, send, join_room
from flask_sqlalchemy import SQLAlchemy

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
basedir = os.path.abspath(os.path.dirname(__file__))


# socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['JWT_SECRET_KEY'] = 'iambadsecretchangeme'
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

from models import db, User
from serializers import user_schema, users_schema, ma
import commands

CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
db.init_app(app)
migrate = Migrate(app, db)
ma.init_app(app)
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
    serialized_user = user_schema.dump(user)
    return jsonify(token=access_token, user=serialized_user), 201

@app.route('/api/token/refresh', methods=['POST'])
@jwt_required()
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(token=access_token, is_refresh=True)

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


## 
# async services (socket.io) events
##
@socketio.on('connect')
def connect():
    print('path:', request.path)
    emit('connected', {'data': f'{request.id}'})

@socketio.on('message')
def handle_message(data):
    send(data)
    print('received:', data)

@socketio.on('join')
def on_join(data):
    user_email = data['email']
    room = data['room']
    join_room(room)
    send(f'{user_email} has entered room', to=room)
    
@socketio.on('disconnect')
def disconnect():
    print('path:', request.path)
    emit('disconnected')


if __name__ == '__main__':
    socketio.run(app, port=7082)