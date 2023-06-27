from sqlalchemy_serializer import SerializerMixin

from config import db

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re



metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


    
    
class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'
    
    id=db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String, nullable=False)
    model = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    trim = db.Column(db.String, nullable=False)  
    mileage = db.Column(db.Integer, nullable=False)
    picture = db.Column(db.String, nullable=False)
    for_sale = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    drives = db.relationship('Drive', back_populates='car')
    drivers = association_proxy('drives', 'driver')
    
    
    # serialize_only = ('id','make','model', 'trim', 'mileage', 'picture')
    serialize_rules = ('-drivers', '-drives')
    
    @validates('mileage')
    def validate_make(self, key, new_mileage):
        if not new_mileage or not 1 <= new_mileage <=250000:
            raise ValueError('Invalid mileage entered: must be between 1 and 250000 miles')
        return new_mileage



class Drive(db.Model, SerializerMixin):
    __tablename__ = 'drives'
    
    id=db.Column(db.Integer, primary_key=True)
    start_point = db.Column(db.String, nullable=False)
    end_point = db.Column(db.String, nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    driver = db.relationship('Driver', back_populates='drives')
    car = db.relationship('Car', back_populates='drives')

    serialize_rules = ('-driver.drives', '-car.drives')

    @validates('mileage')
    def validate_make(self, key, new_mileage):
        if not new_mileage or type(new_mileage) not in [int, float] or not 1 < new_mileage < 50000:
            raise ValueError('Invalid trip mileage entered: must be between 1 and 3500 miles')
        return new_mileage
    
    @validates('start_point')
    def validate_start_point(self, key, start_point):
        if not start_point or type(start_point) not in [str]:
            raise ValueError("Start point must be a string")
        return start_point

    @validates('end_point')
    def validate_end_point(self, key, end_point):
        if not end_point or type(end_point) not in [str]:
            raise ValueError("End point must be a string")
        return end_point


class Driver(db.Model, SerializerMixin):
    __tablename__ = 'drivers'
    
    id=db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    user_name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    drives = db.relationship('Drive', back_populates='driver')
    cars = association_proxy('drives','car')              
    
    serialize_rules = ('-cars', '-drives')
    
    
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name or not 1 < len(first_name) <13:
          raise ValueError(' Your first name must be between 1 and 13 characters long')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name or not 2 < len(last_name) <13:
          raise ValueError(' Your last name must be between 2 and 13 characters long')
        return last_name

    @validates('user_name')
    def validate_user_name(self, key, user_name):
        if not user_name or not 2 < len(user_name) <50:
          raise ValueError(' Your user name must be between 2 and 13 characters long')
        return user_name

    @validates('age')
    def validate_age(self, key, new_age):
        if not new_age or not 16 <= new_age <= 101:
          raise ValueError(' Your age must be between 16 and 100 years old to join')
        return new_age

    @validates('zip_code')
    def validate_zip_code(self, key, current_zip_code):
        if not current_zip_code or not type(int) or not len(current_zip_code) == 5:
            raise ValueError('You must enter a valid zip code to join')
        return current_zip_code
    
    @validates('email_address')
    def emailValid(self, key, current_email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if re.fullmatch(regex, current_email_address):
            return current_email_address
        return ValueError("The given mail is invalid")
            
    @validates('profile_picture')
    def profile_picture_valid(self, key, current_profile_picture):
        if not current_profile_picture or not type(str):
            raise ValueError("")
