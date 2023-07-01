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
      <navbar>
        <Button variant='secondary' onClick={()=>history.push("/")}>My profile</Button>
        <Button variant='secondary' onClick={()=>history.push("/cars")}>See all cars</Button>
        <Button variant='secondary' onClick={handleSignoutClick}>Signout</Button>
        </navbar>
      {mappedDrivers}
    </div>
  )
}

export default DriverCollection