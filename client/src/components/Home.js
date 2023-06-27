import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../logo.png";

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Joy Ride logo" />
        <h1>Joy Ride</h1>
        <button> Login </button>
        <button> Sign up </button>
      </div>
        <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Navbar;