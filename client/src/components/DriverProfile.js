import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import NavBar from './NavBar'
import CarCard from './CarCard'
import UpdateProfileForm from './UpdateProfileForm'
import NewCarForm from './NewCarForm'

function DriverProfile({currentDriver, handleSignoutClick, saveDriver, saveNewCar, setCars}) {
  const history = useHistory()
  const [seeForm, setSeeForm] = useState(false) //profile update
  const [seeCreateCar, setCreateCar] = useState(false)
  
  const toggleForm = () => {
    setSeeForm(currentVal => !currentVal)

  }

const toggleCarForm = () => {
  setCreateCar(currentVal => !currentVal)
}

const {first_name, age, profile_picture, drives, id} = currentDriver

const cars = drives.map(drive => drive.car)
const mappedCars = cars.map(car => <CarCard key={car.id} {...car}/>)

const handleDelete = (e) => {
        fetch(`/api/v1/drivers/${id}`,{
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        history.push('/signin');
    

}

return (
  <div>
  <NavBar/>
  <Container>
    <header> Joy Ride </header>
      <Card.Img variant="top" src={profile_picture}/>
      <Card.Title>Name: {first_name}</Card.Title>
      <Card.Text>Age: {age} years old</Card.Text>
      <Button variant='secondary' onClick={toggleForm}>Edit your profile</Button>
      <Button variant='secondary' onClick={()=>history.go(-1)}>Go Back</Button>
      <Button variant='secondary' onClick={handleSignoutClick}>Signout</Button>
      <Button variant='secondary'onClick={handleDelete}> Driver Delete</Button>
      <Button variant='secondary' onClick={()=>history.push("/cars")}>See all cars</Button>
      {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
      <Button variant='secondary' onClick={toggleCarForm}>Create a new car!</Button>
      {seeCreateCar? <NewCarForm seeCreateCar={seeCreateCar} saveNewCar={saveNewCar} setCars={setCars}/> : null}
{/* create onclick for see all cars             */}
{/* create onclick for see all drives */}    
  </Container> 
  {mappedCars}
  </div> 
)
}

export default DriverProfile