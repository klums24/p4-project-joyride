import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CarCard from './CarCard'

function CarCollection({cars, currentDriver}) {

    

    // useEffect(() => {
    //     fetch("/api/v1/cars")
    //     .then(response => response.json())
    //     .then(data => {
    //       setCars(data)

          
    //     })
    // }, []) 


      const mappedCars = cars.map(car => (
        <Col key={car.id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <CarCard key={car.id} {...car} currentDriver={currentDriver}/>
        </Col>
      ))
    
  return (
    <div>
    {mappedCars}
    </div>
      
  )
}


export default CarCollection


