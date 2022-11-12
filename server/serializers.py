from flask_marshmallow import Marshmallow, Schema

ma = Marshmallow()

class UserSchema(Schema):
	class Meta:
		fields = ('id', 'email',)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
