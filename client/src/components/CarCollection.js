function CarCollection() {
    useEffect(() => {
        fetch("/api/v1/cars")
        .then(response => response.json())
        .then(data => {
          setCars(data)
          console.log(cars)
          
        })
      }, []) 
  return (
    <div>Car Collection</div>
  )
}



function DriveCollection() {
    useEffect(() => {
        fetch("/api/v1/drives")
        .then(response => response.json())
        .then(data => {
          setCars(data)
          console.log(drives)
          
        })
      }, []) 
  return (
    <div> Drive Collection </div>
  )
}

export default CarCollection 
