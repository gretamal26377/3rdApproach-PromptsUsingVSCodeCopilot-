from flask import Flask
from ..shared.config import Config
from ..shared.database import init_extensions
from .admin_routes import admin_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # initialize shared db/migrate via helper
    init_extensions(app)

    # Register only the admin blueprint
    app.register_blueprint(admin_bp)

    return app
