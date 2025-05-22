from flask import Blueprint, jsonify, request, abort, make_response
from .models import User, Store, Product, Order, OrderItem, db
from .auth import token_required, admin_required
from . import utils
import logging

bp = Blueprint('api', __name__, url_prefix='/api')
logging.basicConfig(level=logging.INFO)

# Customer Routes
@bp.route('/register', methods=['POST'])
def register_user():
    """
    Register a new user.
    """
    #Issue: Check for Role Authorization
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['username', 'password', 'email']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'e-mail already exists'}), 400

    try:
        new_user = User(username=data['username'], email=data['email'])
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        token = utils.generate_token(new_user)
        return jsonify({'message': 'User created successfully', 'token': token}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating user: {e}")
        return jsonify({'message': 'Failed to create user'}), 500

@bp.route('/login', methods=['POST'])
def login_user():
    """
    Login a user and return a token.
    """
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['username', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']): #Issue?
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = utils.generate_token(user)
    return jsonify({'message': 'Login successful', 'token': token}), 200

@bp.route('/login', methods=['POST'])
def login_user():
    """
    Login a user and return a token.
    """
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['username', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']): #Issue?
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = utils.generate_token(user)
    return jsonify({'message': 'Login successful', 'token': token}), 200

# Create a Route to decode a user from its token
# Changed to POST as token is received in JSON body. If token is sent as function parameter, it can be GET (conventions)
# It can test this route using curl, Postman, or a similar tool. Here's an example using curl:
# Adjust the http://localhost:5000 part to match your backend's container's localhost address and port
# curl -X POST -H "Content-Type: application/json" -d '{"token": "your_token_here"}' http://localhost:5000/api/decode
@bp.route('/decode', methods=['POST'])
def decode_user():
    """
    Decode a user ID from its token
    """
    data = request.get_json()
    if not data or 'token' not in data:
        return jsonify({'message': 'No token provided'}), 400

    token = data['token']
    user_id = utils.decode_token(token)

    if user_id:
        user = User.query.get(user_id)
        if user:
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return jsonify({'message': 'Token decoded successfully', 'user': user_data}), 200
        else:
            return jsonify({'message': 'User not found for this token'}), 404
    else:
        return jsonify({'message': 'Invalid or expired token'}), 401

@bp.route('/stores', methods=['GET'])
def get_stores():
    """
    Get all stores.
    """
    stores = Store.query.all()
    stores_data = [{'id': store.id, 'name': store.name, 'description': store.description, 'owner_id': store.owner_id} for store in stores]
    return jsonify(stores_data), 200

@bp.route('/stores/<int:store_id>', methods=['GET'])
def get_store(store_id):
    """
    Get a specific store.
    """
    store = Store.query.get_or_404(store_id)
    store_data = {
        'id': store.id,
        'name': store.name,
        'description': store.description,
        'owner_id': store.owner_id
    }
    return jsonify(store_data), 200

@bp.route('/stores', methods=['POST'])
@token_required
def create_store(current_user):
    """
    Create a new store.
    """
    #Issue: Check for Role Authorization
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['name', 'description']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        new_store = Store(name=data['name'], description=data['description'], owner_id=current_user.id)
        db.session.add(new_store)
        db.session.commit()
        return jsonify({'message': 'Store created successfully', 'store_id': new_store.id}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating store: {e}")
        return jsonify({'message': 'Failed to create store'}), 500

@bp.route('/stores/<int:store_id>', methods=['PUT'])
@token_required
def update_store(current_user, store_id):
    """
    Update a store.
    """
    store = Store.query.get_or_404(store_id)
    if store.owner_id != current_user.id and not current_user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    try:
        if 'name' in data:
            store.name = data['name']
        if 'description' in data:
            store.description = data['description']
        db.session.commit()
        return jsonify({'message': 'Store updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating store: {e}")
        return jsonify({'message': 'Failed to update store'}), 500

@bp.route('/stores/<int:store_id>', methods=['DELETE'])
@token_required
def delete_store(current_user, store_id):
    """
    Delete a store.
    """
    store = Store.query.get_or_404(store_id)
    if store.owner_id != current_user.id and not current_user.is_admin: #Strange way to check for Role Authorization but works
        return jsonify({'message': 'Unauthorized'}), 403

    try:
        db.session.delete(store)
        db.session.commit()
        return jsonify({'message': 'Store deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting store: {e}")
        return jsonify({'message': 'Failed to delete store'}), 500

@bp.route('/products', methods=['GET'])
def get_products():
    """
    Get all products.
    """
    #Issue: Products should be filtered by store_id if provided
    products = Product.query.all()
    products_data = [{'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'store_id': product.store_id} for product in products]
    return jsonify(products_data), 200

@bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """
    Get a specific product.
    """
    product = Product.query.get_or_404(product_id)
    product_data = {
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': product.price,
        'store_id': product.store_id
    }
    return jsonify(product_data), 200

@bp.route('/products', methods=['POST'])
@token_required
def create_product(current_user):
    """
    Create a new product.
    """
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['name', 'description', 'price', 'store_id']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        store = Store.query.get_or_404(data['store_id'])
        if store.owner_id != current_user.id and not current_user.is_admin:
            return jsonify({'message': 'Unauthorized to add product to this store'}), 403

        new_product = Product(name=data['name'], description=data['description'], price=data['price'], store_id=data['store_id'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created successfully', 'product_id': new_product.id}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating product: {e}")
        return jsonify({'message': 'Failed to create product'}), 500

@bp.route('/products/<int:product_id>', methods=['PUT'])
@token_required
def update_product(current_user, product_id):
    """
    Update a product.
    """
    product = Product.query.get_or_404(product_id)
    store = Store.query.get(product.store_id)
    if store.owner_id != current_user.id and not current_user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    try:
        if 'name' in data:
            product.name = data['name']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'store_id' in data:
            product.store_id = data['store_id']
        db.session.commit()
        return jsonify({'message': 'Product updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating product: {e}")
        return jsonify({'message': 'Failed to update product'}), 500

@bp.route('/products/<int:product_id>', methods=['DELETE'])
@token_required
def delete_product(current_user, product_id):
    """
    Delete a product.
    """
    product = Product.query.get_or_404(product_id)
    store = Store.query.get(product.store_id)
    if store.owner_id != current_user.id and not current_user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting product: {e}")
        return jsonify({'message': 'Failed to delete product'}), 500

@bp.route('/orders', methods=['GET'])
@token_required
def get_orders(current_user):
    """
    Get all orders for the current user or all orders if the user is an admin.
    """
    if current_user.is_admin:
        orders = Order.query.all()
    else:
        orders = Order.query.filter_by(user_id=current_user.id).all()
    orders_data = [{
        'id': order.id,
        'user_id': order.user_id,
        'order_date': order.order_date,
        'total_amount': order.total_amount,
        'items': [{'product_id': item.product_id, 'quantity': item.quantity} for item in order.items]
    } for order in orders]
    return jsonify(orders_data), 200

@bp.route('/orders/<int:order_id>', methods=['GET'])
@token_required
def get_order(current_user, order_id):
    """
    Get a specific order for the current user or any order if the user is an admin.
    """
    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403
    order_data = {
        'id': order.id,
        'user_id': order.user_id,
        'order_date': order.order_date,
        'total_amount': order.total_amount,
        'items': [{'product_id': item.product_id, 'quantity': item.quantity} for item in order.items]
    }
    return jsonify(order_data), 200

@bp.route('/orders', methods=['POST'])
@token_required
def create_order(current_user):
    """
    Create a new order.
    """
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['items'] #Check at Frontend the way it is sent
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields'}), 400

    if not isinstance(data['items'], list):
        return jsonify({'message': 'Items must be a list'}), 400

    if not data['items']:
        return jsonify({'message': 'Items list cannot be empty'}), 400

    total_amount = 0
    order_items = []
    try:
        for item in data['items']:
            if not all(field in item for field in ['product_id', 'quantity']):
                return jsonify({'message': 'Each item must contain product_id and quantity'}), 400
            product = Product.query.get(item['product_id'])
            if not product:
                return jsonify({'message': f"Product with id {item['product_id']} not found"}), 400
            quantity = item['quantity']
            if quantity <= 0:
                return jsonify({'message': f"Quantity for product {item['product_id']} must be greater than zero"}), 400
            total_amount += product.price * quantity
            order_items.append(OrderItem(product_id=item['product_id'], quantity=quantity))

        new_order = Order(user_id=current_user.id, total_amount=total_amount, items=order_items)
        db.session.add(new_order)
        db.session.commit()
        return jsonify({'message': 'Order created successfully', 'order_id': new_order.id}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error creating order: {e}")
        return jsonify({'message': 'Failed to create order'}), 500

@bp.route('/orders/<int:order_id>', methods=['DELETE'])
@token_required
def delete_order(current_user, order_id):
    """
    Delete an order.  Only admins or the user who created the order can delete it.
    """
    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id and not current_user.is_admin:
        return jsonify({'message': 'Unauthorized'}), 403

    try:
        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Order deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting order: {e}")
        return jsonify({'message': 'Failed to delete order'}), 500

# Admin Routes
@bp.route('/admin/users', methods=['GET'])
@token_required
@admin_required
def get_users(current_user):
    """
    Get all users (admin only).
    """
    users = User.query.all()
    users_data = [{'id': user.id, 'username': user.username, 'email': user.email, 'is_admin': user.is_admin} for user in users]
    return jsonify(users_data), 200

@bp.route('/admin/users/<int:user_id>', methods=['GET'])
@token_required
@admin_required
def get_user(current_user, user_id):
    """
    Get a specific user (admin only).
    """
    user = User.query.get_or_404(user_id)
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_admin': user.is_admin
    }
    return jsonify(user_data), 200

@bp.route('/admin/users/<int:user_id>', methods=['PUT'])
@token_required
@admin_required
def update_user(current_user, user_id):
    """
    Update a user (admin only).
    """
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    try:
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'is_admin' in data:
            user.is_admin = data['is_admin']
        db.session.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating user: {e}")
        return jsonify({'message': 'Failed to update user'}), 500

@bp.route('/admin/users/<int:user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user, user_id):
    """
    Delete a user (admin only).
    """
    user = User.query.get_or_404(user_id)
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting user: {e}")
        return jsonify({'message': 'Failed to delete user'}), 500