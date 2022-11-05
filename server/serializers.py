from flask_marshmallow import Marshmallow
from app import app

ma = Marshmallow(app)

class UserSchema(ma.Schema):
	class Meta:
		fields = ('id', 'email',)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
