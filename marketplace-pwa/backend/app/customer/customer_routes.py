from flask import Blueprint, jsonify, request
from ..customer.customer_management import register_user_logic, login_user_logic, decode_user_logic

customer_bp = Blueprint('customer_bp', __name__, url_prefix='/api')

@customer_bp.route('/register', methods=['POST'])
def register_user():
    #Issue: Check for Role Authorization
    data = request.get_json()
    result, status = register_user_logic(data)
    return jsonify(result), status

@customer_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    result, status = login_user_logic(data)
    return jsonify(result), status

"""
Create a Route to decode a user from its token
Changed to POST as token is received in JSON body. If token is sent as function parameter, it can be GET (conventions)
It can test this route using curl, Postman, or a similar tool. Here's an example using curl:
Adjust the http://localhost:5000 part to match your backend's container's localhost address and port
curl -X POST -H "Content-Type: application/json" -d '{"token": "your_token_here"}' http://localhost:5000/api/decode
"""
@customer_bp.route('/decode', methods=['POST'])
def decode_user():
    data = request.get_json()
    result, status = decode_user_logic(data)
    return jsonify(result), status

# Store, Product, and Order routes would be similarly moved here, following the same pattern.
