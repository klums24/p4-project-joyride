# Joyride

Joyride is an application designed for sports car owners to socialize, connect, and share information about their favorite cars, drivers, and drives. 


## Back End Installation

To get the backend server running, from your terminal, navigate into the server folder, verify that the file app.py is in this directory, and then run the following command: 

```bash
python3 /app.py
```

## Features
#### Sign up/create a driver profile:
```python
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
```

#### Sign in/out of driver profile:
```python
class SignIn(Resource):
    def post(self):

        email = request.get_json()["email"]
        password = request.get_json()["password"]

        driver = Driver.query.filter(Driver.email == email).first()

        if driver:
            # import ipdb; ipdb.set_trace()
            if driver.password == password:
                session["driver_id"] = driver.id
                return driver.to_dict(), 200
        return make_response({"error": "Unauthorized"}, 401)
    
api.add_resource(SignIn, "/signin")

class SignOut(Resource):
    def delete(self):
        
        session["driver_id"] = None
                
        return make_response({}, 204)
        

api.add_resource(SignOut, "/signout")
```
#### Modify/delete driver profile:
```python
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
        
    def patch(self, id):
        try:
            data = request.get_json()
            driver = db.session.get(Driver, id)
            for k, v in data.items():
                setattr(driver, k, v)
            db.session.commit()
            return make_response((driver.to_dict()), 200)
        except Exception as e:
            return make_response(({"error": str(e)}),400)    
        

api.add_resource(DriverById, "/drivers/<int:id>")
```

#### Add a new car/display cars:
```python
class Cars(Resource):
    def get(self):
        cars =[c.to_dict() for c in Car.query.all()]
        return make_response(cars, 200)
    
    def post(self):
        try:
            data = request.get_json()
            car = Car(**data)
            db.session.add(car)
            db.session.commit()
            drive = Drive(driver_id= session.get('driver_id'), car_id=car.id )
            db.session.add(drive)
            db.session.commit()
            return make_response((car.to_dict()), 201)
        except Exception as e:
            return make_response(({"error": str(e)}),400)

api.add_resource(Cars, "/cars")
```

#### Delete car:
```python
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
            
api.add_resource(CarById, "/cars/<int:id>")
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Licensing
MIT License

Copyright (c) [2023] [Meridith Lawn, Ashley Burnett, Kevin Lumauig]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Authors and acknowledgment
The creators of Joyride:

Meridith Lawn (https://github.com/meridithlawn) <br>
Ashley Burnett (https://github.com/AshleyBurnett081) <br>
Kevin Lumauig (https://github.com/klums24)

