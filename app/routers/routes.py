from flask import Blueprint, request, jsonify
from models import db, Transaction
from services.service import get_all_data, save_transaction
import services.service as service

def init_routes(app, db):
    bp = Blueprint('api', __name__, url_prefix='/api')

    @bp.route('/expense', methods=['POST'])
    def create_expense():
        data = request.get_json()
        response, status_code = save_transaction({
            "date" : data['expenseDate'],
            "category" : data['expenseCategory'],
            "amount" : float(data['expenseAmount']),
            "asset" : data['expenseAsset'],
            "note" : data['expenseNote'],
        }, 'expense')

        return jsonify(response), status_code
    


    @bp.route('/income', methods=['POST'])
    def create_income():
        data = request.get_json()
        response, status_code = save_transaction({
            "date" : data['incomeDate'],
            "category" : data['incomeCategory'],
            "amount" : float(data['incomeAmount']),
            "asset" : data['incomeAsset'],
            "note" : data['incomeNote'],
        }, 'income')

        return jsonify(response), status_code

    @bp.route('/data', methods=['GET'])
    def get_all_data_routes():
        return get_all_data()
    
    @bp.route("/get_expense_data", methods=["GET"])
    def get_expense_data_routes():
        return service.get_expense_data()
    
    @bp.route("/get_income_data", methods=["GET"])
    def get_income_data_routes():
        return service.get_income_data()
    
    @bp.route('/get_insights_money', methods=['GET'])
    def get_insights_money_route():
        return service.get_insight_money()

    app.register_blueprint(bp)
