import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./NavBar";
// import SignUpForm from "./SignUpForm";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import LoggedIn from "./LoggedIn";
import DriverCollection from "./DriverCollection";
import DriverProfile from "./DriverProfile";
import CarCollection from "./CarCollection";
import CarCard from "./CarCard";

function App() {
  

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [currentDriver, setCurrentDriver] = useState(null)
  const [newCar, setNewCar] = useState(null)
  const [cars, setCars] = useState([])
  
  useEffect(() => {
    fetch("/api/v1/cars")
    .then(response => response.json())
    .then(data => {
      setCars(data)

      
    })
}, []) 
  
  
  
  
  
  
  const saveNewCar = (new_car) => {
    setNewCar(new_car)
  }
  
  const saveDriver = (new_driver) => {
    setCurrentDriver(new_driver)
  }

  const handleToggleForm = () => {
    setShowLoginForm(currentVal => !currentVal);
  };

  const handleSignoutClick= () => {
    fetch("/api/v1/signout", {method: "DELETE"})
      .then(() => {
      setCurrentDriver(null); 
      
    }, );
  }



  useEffect(() => {
    fetch("/api/v1/check-user")
    .then(response => {
      if (response.ok){
        response.json()
        .then(saveDriver)
      }
    })
    }, [])


if (!currentDriver) {
  return showLoginForm ? <LoginForm saveDriver={saveDriver} handleToggleForm={handleToggleForm}/> : <NewUserForm saveDriver={saveDriver} handleToggleForm={handleToggleForm}/>
}  


 
  return (
    <div>
      <Switch>
        <Route path = '/drivers'>
          <DriverCollection />
        </Route>
        <Route exact path = '/'>
          <DriverProfile currentDriver={currentDriver} handleSignoutClick={handleSignoutClick} saveDriver={saveDriver}/>
        </Route>
        {/* <Route exact path="/">
          <LoggedIn handleSignoutClick={handleSignoutClick}/>
        </Route> */}
        <Route path="/cars">
          <CarCollection />
        </Route>
      </Switch>
    </div>
  );
}
export default App;

