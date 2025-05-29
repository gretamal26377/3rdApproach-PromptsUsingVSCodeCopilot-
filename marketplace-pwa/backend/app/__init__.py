from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints for admin and customer
    from .admin.admin_routes import admin_bp
    from .customer.customer_routes import customer_bp
    app.register_blueprint(admin_bp)
    app.register_blueprint(customer_bp)

    return app