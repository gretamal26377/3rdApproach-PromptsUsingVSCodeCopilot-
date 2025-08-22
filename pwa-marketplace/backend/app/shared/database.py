from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Centralized DB instances used across the application
# Import `db` and `migrate` from other modules instead of creating new instances
db = SQLAlchemy()
migrate = Migrate()


def init_extensions(app):
    """
    Initialize DB related extensions on the provided Flask app.
    Call this from the app factory (create_app) in each blueprint package.
    """
    db.init_app(app)
    migrate.init_app(app, db)
