import React, {useState, useEffect} from 'react'

import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'

import CarCard from './CarCard'

function CarCollection({cars, currentDriver, handleSignoutClick}) {

  const history = useHistory()

    // useEffect(() => {
    //     fetch("/api/v1/cars")
    //     .then(response => response.json())
    //     .then(data => {
    //       setCars(data)

          
    //     })
    // }, []) 


      const mappedCars = cars.map(car => <CarCard key={car.id} {...car} currentDriver={currentDriver}/>)
    
  return (
    <div>
      <navbar>
        <Button variant='secondary' onClick={()=>history.push("/")}>My profile</Button>
        <Button variant='secondary' onClick={()=>history.push("/drivers")}>See all drivers</Button>
        <Button variant='secondary' onClick={handleSignoutClick}>Signout</Button>
      </navbar>
    {mappedCars}
    </div>
  )
}


export default CarCollection


