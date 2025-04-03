from flask import blueprints, request, jsonify
from services.ai import parse_transaction

def init_ai_routes(app,db):
    ai_bp = blueprints.Blueprint('ai', __name__, url_prefix='/ai')

    @ai_bp.route('/parse_transaction', methods=['POST'])
    def parse_transaction_route():
        data = request.get_json()
        response, status_code = parse_transaction(data['text'])
        return response, status_code

    app.register_blueprint(ai_bp)