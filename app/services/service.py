from models import db, Transaction
from flask import jsonify
from models import Transaction

def get_all_data():
    transaksi = Transaction.query.all()
    data = [{
        "id": t.id,
        "date": t.date,
        "category": t.category,
        "amount": t.amount,
        "asset": t.asset,
        "note": t.note
    } for t in reversed(transaksi)]
    return jsonify(data), 200

def get_expense_data():
    transaksi = Transaction.query.filter_by(type='expense').all()
    data = [
        {
            "id": t.id,
            "date": t.date,
            "category": t.category,
            "amount": t.amount,
            "asset": t.asset,
            "note": t.note
        } for t in reversed(transaksi)
    ]
    return jsonify(data), 200

def get_income_data():
    transaksi = Transaction.query.filter_by(type='income').all()
    data = [
        {
            "id": t.id,
            "date": t.date,
            "category": t.category,
            "amount": t.amount,
            "asset": t.asset,
            "note": t.note
        } for t in transaksi
    ]
    return jsonify(data), 200

def save_transaction(data, transaction_type):
    transaction = Transaction(
        date=data['date'],
        category=data['category'],
        amount=float(data['amount']),
        asset=data['asset'],
        note=data['note'],
        type=transaction_type  # Set the type based on the transaction type
    )
    try:
        db.session.add(transaction)
        db.session.commit()
        return {"message": f"{transaction_type.capitalize()} saved!"}, 201
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

    pass

def get_insight_money():
    transaksi = Transaction.query.all()
    total_income = sum(t.amount for t in transaksi if t.type == 'income')
    total_expense = sum(t.amount for t in transaksi if t.type == 'expense') 

    money_left = total_income - total_expense

    return jsonify({"total_income": total_income, "total_expense": total_expense, "money_left": money_left}), 200