import React, {useState, useEffect} from 'react'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import CarCard from './CarCard'

function CarCollection({cars, currentDriver, handleSignoutClick}) {

  const history = useHistory()

      const mappedCars = cars.map(car => (
        <Col key={car.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <CarCard key={car.id} {...car} currentDriver={currentDriver}/>
        </Col>
      ))
    
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


