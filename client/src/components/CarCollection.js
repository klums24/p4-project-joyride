import React, {useState, useEffect} from 'react'
import CarCard from './CarCard'

function CarCollection({cars, currentDriver}) {

    

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
        
    {mappedCars}
    </div>
  )
}


export default CarCollection


