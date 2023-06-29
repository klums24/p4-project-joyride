import React, {useState, useEffect} from 'react'
import CarCard from './CarCard'

function CarCollection() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch("/api/v1/cars")
        .then(response => response.json())
        .then(data => {
          setCars(data)

          
        })
    }, []) 


      const mappedCars = cars.map(car => <CarCard key={car.id} {...car}/>)
    
  return (
    <div>
        
    {mappedCars}
    </div>
  )
}


export default CarCollection