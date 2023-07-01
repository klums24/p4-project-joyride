import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import CarCard from './CarCard'
import UpdateProfileForm from './UpdateProfileForm'
import NewCarForm from './NewCarForm'
import NewDriveForm from './NewDriveForm'

function DriverProfile({currentDriver, handleSignoutClick, saveDriver, saveNewCar, setCars, saveNewDrive, addDriveToUser}) {
  const history = useHistory()
  const [seeForm, setSeeForm] = useState(false) //profile update
  const [seeCreateCar, setCreateCar] = useState(false)
  const [newDrive, setNewDrive] = useState(null)
  const [seeDriveForm, setSeeDriveForm] = useState(false)
  
  const toggleForm = () => {
    setSeeForm(currentVal => !currentVal)

  }

const toggleCarForm = () => {
  setCreateCar(currentVal => !currentVal)
}

const toggleDriveForm = () => {
  setSeeDriveForm(currentVal => !currentVal)
}

const {first_name, age, profile_picture, drives, id} = currentDriver

const cars = drives.map(drive => drive.car)
const mappedCars = cars.map(car => <CarCard key={car.id} {...car} currentDriver={currentDriver}/>)

const handleDelete = (e) => {
        fetch(`/api/v1/drivers/${id}`,{
          method: 'DELETE'
        })
        .then(res => {
          if (res.ok){
            saveDriver(null)
            // history.push("/signin")
          }
          
        })
        .catch(error => console.error(error))
        
    

}

  return (
    <div>
      <header class="form-text"> 
        Welcome to JoyRide, {currentDriver.first_name}!
      </header>
        <navbar>
        <button class="button" variant='secondary' onClick={()=>history.push("/drivers")}>See all drivers</button>
        <button class="button" variant='secondary' onClick={()=>history.push("/cars")}>See all cars</button>
        <button class="button" variant='secondary' onClick={handleSignoutClick}>Signout</button>
        </navbar>
      
      <Container>
          <Card.Img variant="top" src={profile_picture}/>
          <Card.Title class="form-text">Name: {first_name}</Card.Title>
          <Card.Text class="form-text">Age: {age} years old</Card.Text>
          <button class="button" variant='secondary' onClick={toggleForm}>Edit your profile</button>
          {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
          <button class="button" variant='secondary' onClick={toggleCarForm}>Create a new car</button>
          {seeCreateCar ? <NewCarForm seeCreateCar={seeCreateCar} saveNewCar={saveNewCar} setCars={setCars} addDriveToUser={addDriveToUser}/> : null}
          <button class="button" variant='secondary' onClick={toggleDriveForm}>Create a new drive!</button>
          {seeDriveForm ? <NewDriveForm seeDriveForm={seeDriveForm} saveNewDrive={saveNewDrive} setNewDrive={setNewDrive} currentDriver={currentDriver} addDriveToUser={addDriveToUser}/> : null}
      </Container>
      {mappedCars}
      <footer>
      <button class="button" variant='secondary'onClick={handleDelete}> Delete account</button>
      </footer> 
      </div> 
  )
}

export default DriverProfile