#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Car, Driver, Drive

def create_cars():
    cars = []
    for _ in range(5):
        c = Car(
            make=fake.first_name(),
            model=randint(1990, 2023),
            year=randint(1990, 2023),
            picture=fake.image_url(),    
        )
        cars.append(c)
    return cars


def create_drivers():
    drivers = []
    for _ in range(5):
        d = Driver(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            user_name=fake.user_name(),
            age=randint(16, 100),
            zip_code=fake.zipcode(),
            email=fake.email(),
            profile_picture=fake.image_url(),
            password = fake.password()
        )
        drivers.append(d)
    return drivers


def create_drives(cars, drivers):
    drives = []
    for _ in range(5):
        dr = Drive(
            details=fake.text(),
            car_id=rc([car.id for car in cars]),
            driver_id=rc([driver.id for driver in drivers])
        )
        drives.append(dr)
    return drives

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting database...")
        
        Car.query.delete()
        Driver.query.delete()
        Drive.query.delete()

        print("Seeding cars...")
        cars = create_cars()
        db.session.add_all(cars)
        db.session.commit()

        print("Seeding drivers...")
        drivers = create_drivers()
        db.session.add_all(drivers)
        db.session.commit()

        print("Seeding drives...")
        drives = create_drives(cars, drivers)
        db.session.add_all(drives)
        db.session.commit()
        print('complete')
        
        
