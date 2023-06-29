import React from 'react'

function CarCollection() {
    useEffect(() => {
        fetch("/api/v1/cars")
        .then(response => response.json())
        .then(data => {
          setCars(data)
          console.log(cars)
          
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