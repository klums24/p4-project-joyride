import React, {useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import NavBar from './NavBar'
import CarCard from './CarCard'
import UpdateProfileForm from './UpdateProfileForm'

function DriverProfile({currentDriver, handleSignoutClick, saveDriver}) {
  const history = useHistory()
  const [seeForm, setSeeForm] = useState(false)
  
  const toggleForm = () => {
    setSeeForm(currentVal => !currentVal)
  }

const {first_name, age, profile_picture, drives} = currentDriver

const cars = drives.map(drive => drive.car)
const mappedCars = cars.map(car => <CarCard key={car.id} {...car}/>)



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
      <Button variant='secondary' onClick={()=>history.push("/cars")}>See all cars</Button>
      {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
{/* create onclick for see all cars             */}
{/* create onclick for see all drives */}    
  </Container> 
  {mappedCars}
  </div> 
)
}

export default DriverProfile