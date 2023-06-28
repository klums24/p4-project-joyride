import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./NavBar";
// import SignUpForm from "./SignUpForm";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";



function App() {
  // Code goes here!
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false)

  const handleToggleForm = () => {
    setShowForm(currentVal => !currentVal);
  };
  // useEffect(() => {
  //   fetch("/api/v1/drivers")
  //   .then(response => response.json())
  //   .then(data => {
  //     setDrivers(data)
  //     console.log(drivers)
      
  //   })
  // }, [])


  


 
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <header>
            <div className="logo">
              <h1>Joy Ride</h1>
              {showForm ? <LoginForm /> : <NewUserForm />}
              <button onClick={handleToggleForm}>
                {showForm ? "Sign Up" : "Login"}
              </button>
              <img src="https://cdn.ferrari.com/cms/network/media/img/resize/60d0b58c9b071e08fb36d6b5-ferrari-296-gtb-intro-desk-2?width=1920&height=1600" alt="ferrari" />
            </div>
          </header>
        </Route>
      </Switch>
    </div>
  );
}
export default App;

