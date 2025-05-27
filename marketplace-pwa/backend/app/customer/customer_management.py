from ..models import User, Store, Product, Order, OrderItem, db
import logging
from ..auth import generate_token, decode_token

def register_user_logic(data):
    if not data:
        return {'message': 'No data provided'}, 400
    required_fields = ['username', 'password', 'email']
    if not all(field in data for field in required_fields):
        return {'message': 'Missing required fields'}, 400
    if User.query.filter_by(username=data['username']).first():
        return {'message': 'Username already exists'}, 400
    if User.query.filter_by(email=data['email']).first():
        return {'message': 'e-mail already exists'}, 400
    try:
        new_user = User(username=data['username'], email=data['email']) # type: ignore
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        token = generate_token(new_user)
        return {'message': 'User created successfully', 'token': token}, 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating user: {e}")
        return {'message': 'Failed to create user'}, 500

def login_user_logic(data):
    if not data:
        return {'message': 'No data provided'}, 400
    required_fields = ['username', 'password']
    if not all(field in data for field in required_fields):
        return {'message': 'Missing required fields'}, 400
    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return {'message': 'Invalid credentials'}, 401
    token = generate_token(user)
    return {'message': 'Login successful', 'token': token}, 200

def decode_user_logic(data):
    if not data or 'token' not in data:
        return {'message': 'No token provided'}, 400
    token = data['token']
    user_id = decode_token(token)
    if user_id:
        user = User.query.get(user_id)
        if user:
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return {'message': 'Token decoded successfully', 'user': user_data}, 200
        else:
            return {'message': 'User not found for this token'}, 404
    else:
        return {'message': 'Invalid or expired token'}, 401
