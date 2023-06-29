#!/usr/bin/env python3

# Standard library imports

# Remote library imports
# from flask import Flask, request
# from flask_restful import Api, Resource
# from flask_migrate import Migrate
# from flask import Flask, request, make_response
import os
# from config import app, db, api

import ipdb
from flask import Flask, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Local imports
# from config import app
from models import Driver, Drive, Car, db

# Views go here!



BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "SuperSecretKey"
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
# db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

api=Api(app)
db.init_app(app)


# Instantiate REST API


# Instantiate CORS
CORS(app)




@app.route('/api/v1')
def index():
    return '<h1>JoyRide!</h1>'

@app.route("/api/v1/check-user", methods=["GET"])
def check_user():
    if id := session.get("driver_id"):
        if driver := db.session.get(Driver, id):
            return make_response(driver.to_dict(), 200)
    
    return make_response({"error": "Unauthorized (from check user)"}, 401)

# the following class check user is a test, can comment back in the non restful route
# class CheckUser(Resource):
#     def get(self):
#         if session.get('driver_id'):
#             user = Driver.query.filter(Driver.id == session['driver_id']).first()
#             return user.to_dict(), 200
#         return {'error': '401 Unauthorized'}, 401
    
# api.add_resource(CheckUser, '/check-user')


@app.route("/api/v1/signup" , methods=["POST"])
def signup():
    try:
        data = request.get_json()
        new_driver = Driver(**data)
        db.session.add(new_driver)
        db.session.commit()
        session["driver_id"] = new_driver.id
        return make_response(new_driver.to_dict(), 201)
    except Exception as e:
        return make_response({"error": str(e) }, 400)

class SignIn(Resource):
    def post(self):

        email = request.get_json()["email"]
        password = request.get_json()["password"]

        driver = Driver.query.filter(Driver.email == email).first()

        if driver:
            if driver.password == password:
                session["driver_id"] = driver.id
                ipdb.set_trace()
                return driver.to_dict(), 200
        return make_response({"error": "Unauthorized (from sign in)"}, 401)
    
api.add_resource(SignIn, "/api/v1/signin")

class SignOut(Resource):
    def delete(self):
        
        session["driver_id"] = None   
        return make_response({}, 204)
        

api.add_resource(SignOut, "/api/v1/signout")

class Cars(Resource):
    def get(self):
        cars =[c.to_dict() for c in Car.query.all()]
        return make_response(cars, 200)

api.add_resource(Cars, "/api/v1/cars")

class CarById(Resource):
    def get(self, id):
        car_by_id = db.session.get(Car, id)
        if car_by_id:
            return make_response(car_by_id.to_dict(), 200)
        return make_response(({"error": "404: Car not found."}) ,404)
        
    def delete(self, id):
        try:
            car = db.session.get(Car, id)
            db.session.delete(car)
            db.session.commit()
            return make_response(({}),204)
        except Exception as e:
            return make_response(({"error": "404: Car not found."}),404)
            
api.add_resource(CarById, "/api/v1/cars/<int:id>")

class Drivers(Resource):

    def get(self):
        drivers = [d.to_dict() for d in Driver.query.all()]
        if drivers:
            return make_response(drivers, 200)
        return make_response("no drivers found", 404)
    
    # def post(self):
    #     try:
    #         data = request.get_json()
    #         driver = Driver(**data)
    #         db.session.add(driver)
    #         db.session.commit()
    #         return make_response((driver.to_dict()), 201)
    #     except Exception as e:
    #         return make_response(({"error": str(e)}),400)
        
api.add_resource(Drivers, '/api/v1/drivers')
    
class DriverById(Resource):
    def get(self, id):
        driver_by_id = db.session.get(Driver, id)
        if driver_by_id:
            return make_response(driver_by_id.to_dict(), 200)
        return make_response(({"error": "404: Driver not found."}) ,404)
    
    def delete(self, id):
        try:
            driver = db.session.get(Driver, id)
            db.session.delete(driver)
            db.session.commit()
            return make_response(({}),204)
        except Exception as e:
            return make_response(({"error": "404: Driver not found."}),404)
api.add_resource(DriverById, "/api/v1/drivers/<int:id>")

class Drives(Resource):
    def get(self):
        drives = [d.to_dict() for d in Drive.query.all()]
        return make_response(drives, 200)
    
    
    def post(self):
        try:
            data = request.get_json()
            drive = Drive(**data)
            db.session.add(drive)
            db.session.commit()
            return make_response((drive.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)
        
api.add_resource(Drives, '/api/v1/drives')

if __name__ == '__main__':
    app.run(port=5555, debug=True)