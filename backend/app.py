from flask import Flask, request, jsonify, session
import os
import certifi
from dotenv import load_dotenv
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt


app = Flask(__name__)

app.secret_key = os.getenv("APP_KEY")
bcrypt = Bcrypt(app)
CORS(app)

load_dotenv()
app.config["MONGO_URI"] = os.getenv("MONGO_URL")
db = PyMongo(app, tlsCAFile=certifi.where()).db

@app.route('/register', methods = ['GET', 'POST'])
def register():
    username = request.json["username"]
    password = request.json["password"]

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    if db.credentials.find_one({"username" : username}):
        return jsonify({"error": "User already exists"}), 409


    db.credentials.insert_one({
        "username":username,
        "password":hashed_password
    })

    return jsonify({
        "username":username,
        "password":hashed_password
    })   


@app.route("/login", methods = ['POST', 'GET'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = db.credentials.find_one({"username": username})

    session['user_id'] = username

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({"success": "Login successful"}), 200
    elif user:
        return jsonify({"error": "Incorrect password"}), 401
    else:
        return jsonify({"error": "User does not exist"}), 404

@app.route("/getUser")
def getUser():
    if 'user_id' not in session.keys():
        return jsonify({
            "error" : "Unauthorised session" 
        }),404
    username = session['user_id']

    if username:
        user = db.credentials.find_one({"username": username})
        return jsonify({
            "username":user['username'],
            "password":user['password']
        })   
    else:
        return jsonify({
            "error" : "Unauthorised session" 
        }),404
    
@app.route("/logout")
def logout():
    session.clear()

    return jsonify({
        "success":"bye!"
    })

if __name__ == '__main__':
    app.run()