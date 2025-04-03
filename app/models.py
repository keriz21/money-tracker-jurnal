from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    asset = db.Column(db.String(50), nullable=False)
    note = db.Column(db.String(200), nullable=True)
    type = db.Column(db.String(10), nullable=False)  # 'expense', 'income', or 'transfer'
