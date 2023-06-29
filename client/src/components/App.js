import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./NavBar";
// import SignUpForm from "./SignUpForm";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import LoggedIn from "./LoggedIn";
import DriverCollection from "./DriverCollection";
import DriverProfile from "./DriverProfile";



function App() {
  // Code goes here!

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [currentDriver, setCurrentDriver] = useState(null)
  
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
        <Route exact path="/">
          <LoggedIn handleSignoutClick={handleSignoutClick}/>
        </Route>
        <Route path = '/drivers'>
          <DriverCollection />
        </Route>
        <Route path = '/profile'>
          <DriverProfile currentDriver={currentDriver}/>
        </Route>
      </Switch>
    </div>
  );
}
export default App;

