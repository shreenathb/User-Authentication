from app import db
from flask_login import UserMixin

class User(db, UserMixin):
    def __init__(self):
        self.username = ""
        self.hashed_password = ""
        self.role = ""

    def getUser(self):
        user = db.credentials.find_one({"username": self.username})
        return user
    
    def is_authenticated(self):
        return self.role == "admin"
    
    

    
