from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

from services.service import save_transaction

import json
import datetime

from flask import jsonify

import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(model="gpt-4o-mini")

def parse_transaction(text):
    """
    Fungsi untuk mengubah teks transaksi menjadi format JSON.
    """
    system_prompt = """
    Kamu adalah asisten yang membantu mengubah teks transaksi menjadi format JSON.
    Struktur JSON yang harus dikembalikan:
    {
        "jenis_transaksi": "Pemasukan | Pengeluaran",
        "data" : {
            "date": "YYYY-MM-DD",
            "category": "Kategori transaksi",
            "note": "Deskripsi transaksi",
            "amount": "Nominal dalam angka",
            "jenis_transaksi": "Pemasukan | Pengeluaran",
            "asset": "Nama aset yang terlibat dalam transaksi"
        }       
    }
    Jika informasi tidak tersedia dalam teks, buat tebakan yang masuk akal.
    Format angka harus tanpa simbol mata uang.

    untuk kategori transaksi, jika input diklasifikan sebagai pengeluaran
    kategori yang valid adalah:
    - Makanan dan Minuman
    - Transportasi
    - Hiburan
    - Lainnya

    untuk kategori transaksi, jika input diklasifikan sebagai pemasukan
    kategori yang valid adalah:
    - Gaji
    - Investasi
    - Hadiah
    - Lainnya

    untuk asset yang valid adalah:
    - Cash
    - BNI
    - JENIUS
    - JENIUS Simpan
    
    tidak diperkenankan menambah elemen lain selain json file seperti ```json file``` seperti itu. murni json file yang keluar

    """
    
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=f"Teks: {text}\nUbah ke JSON format.")
    ]
    
    response = llm(messages)
    json_response = response.content.strip()

    print(json_response)
    
    try:
        parsed_data = json.loads(json_response)
    except json.JSONDecodeError:
        parsed_data = {"error": "Gagal mengurai JSON"}
    
    parsed_data_to_db(parsed_data)

    return jsonify(parsed_data), 200

def parsed_data_to_db(parsed_data):
    tipe_transaksi = parsed_data['jenis_transaksi']
    data = parsed_data['data']
    if tipe_transaksi == 'Pemasukan':
        save_transaction(data, 'income')
    elif tipe_transaksi == 'Pengeluaran':
        save_transaction(data, 'expense')
    pass