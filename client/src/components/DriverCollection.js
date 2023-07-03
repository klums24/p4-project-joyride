import React, {useState, useEffect} from 'react'
import DriverCard from './DriverCard';
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'


function DriverCollection({handleSignoutClick}) {

  const history = useHistory()
  const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch("/api/v1/drivers")
        .then(response => response.json())
        .then(data => {
          setDrivers(data)
        })
      }, []) 

    const mappedDrivers = drivers.map(driver => <DriverCard key={driver.id} {...driver}/>)

  return (

    <div>
      <navbar class="container">
        <button class="button" variant='secondary' onClick={()=>history.push("/")}>My profile</button>
        <button class="button" variant='secondary' onClick={()=>history.push("/cars")}>See all cars</button>
        <button class="button" variant='secondary' onClick={handleSignoutClick}>Signout</button>
        </navbar>
      <h3 class="form-text">ALL DRIVERS</h3>
      <div class="container">
      {mappedDrivers}
      </div>
    </div>
  )
}

export default DriverCollection