from flask import Flask
from ..shared.config import Config
from ..shared.database import init_extensions

from .customer_routes import customer_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    init_extensions(app)

    # Register only the customer blueprint
    app.register_blueprint(customer_bp)

    return app
