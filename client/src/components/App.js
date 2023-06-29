import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./NavBar";
// import SignUpForm from "./SignUpForm";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";



function App() {
  // Code goes here!
  const [drivers, setDrivers] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [currentDriver, setCurrentDriver] = useState(null)
  
  const saveDriver = (new_driver) => {
    setCurrentDriver(new_driver)
  }

  const handleToggleForm = () => {
    setShowLoginForm(currentVal => !currentVal);
  };

  const handleSignoutClick= () => {
    fetch("/signout", {method: "DELETE"})
      .then(() => {
      setCurrentDriver(null); 
      
    }, );
  }



  useEffect(() => {
    fetch("/check-user")
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
          <header>
            <div className="logo">
              <h1>Joy Ride</h1>
              <button onClick={handleSignoutClick}>Logout</button>
              <img src="https://cdn.ferrari.com/cms/network/media/img/resize/60d0b58c9b071e08fb36d6b5-ferrari-296-gtb-intro-desk-2?width=1920&height=1600" alt="ferrari" />
            </div>
          </header>
        </Route>
      </Switch>
    </div>
  );
}
export default App;

