import os

class Config:
    # SECRET_KEY is used for session management and should be kept secret in production.
    # It's different from DB password
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'mysql+pymysql://root:password@localhost/marketplace_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
