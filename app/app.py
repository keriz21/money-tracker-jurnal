from flask import Flask
from flask_cors import CORS
from models import init_db
# from routers.routes import init_routes
from routers.routes import init_routes
from routers.ai_routes import init_ai_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db = init_db(app)
init_routes(app, db)
init_ai_routes(app, db)

if __name__ == '__main__':
    app.run(debug=True)