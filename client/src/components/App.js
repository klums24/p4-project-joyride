import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import SignUpForm from "./SignUpForm";

function App() {
  // Code goes here!
  const [userss, setUsers] = useState([]);

  const handleNewUser = (newUserObj) => {
    setUsers(currentUsers => [...currentUsers, newUserObj])
  }



  // const handleNewProject = (newProjectObj) => {
  //   setProjects(currentProjects => [...currentProjects, newProjectObj])
  // }
  return (
    <div>
      {/* <Switch>
        <Route exact path = "/"> */}
          <header>
            <div className="logo">
              <h1>Joy Ride</h1>
              <SignUpForm handleNewUser={handleNewUser}/>
              <button> Login </button>
              <button> Sign up </button>
            <img src="https://cdn.ferrari.com/cms/network/media/img/resize/60d0b58c9b071e08fb36d6b5-ferrari-296-gtb-intro-desk-2?width=1920&height=1600" alt="ferrari" />
            </div>
              {/* <nav>
              <Link to="/">Home</Link>
            </nav> */}
          </header>
        {/* </Route>
      </Switch> */}
    </div>
  );
}
export default App;

