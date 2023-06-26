#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, request, make_response
import os

# Local imports
from config import app, db, api
from models import Driver, Drive, Car

# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def index():
    return '<h1>JoyRide!</h1>'

api=Api(app)
class Cars(Resource):
        def get(self):
            cars =[c.to_dict() for c in Car.query.all()]
            return make_response(cars, 200)
        
        def patch(self):
            pass

api.add_resource(Car, '/cars')

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
            
api.add_resource(CarById, '/cars/<int:id>')

class Drivers(Resource):
    def get(self):
        drivers = [d.to_dict() for d in Driver.query.all()]
        return make_response(drivers, 200)
    
    def patch(self):
        pass
    
api.add_resource(Driver, '/drivers')
    
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
api.add_resource(Driver, '/drivers/<int:id>')

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
        
    api.add_resource(Drive, '/drives')