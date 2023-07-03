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
      <header> 
      <h3 class="form-text">WELCOME TO JOYRIDE, {currentDriver.first_name}!</h3>
      </header>
        <navbar class="container">
        <button class="button" variant='secondary' onClick={()=>history.push("/drivers")}>See all drivers</button>
        <button class="button" variant='secondary' onClick={()=>history.push("/cars")}>See all cars</button>
        <button class="button" variant='secondary' onClick={handleSignoutClick}>Signout</button>
        </navbar>
      
      <Container>
        <Card>
          <img class="profile-page-image" variant="top" src={profile_picture} alt="profile-pic"/>
          <Card.Title class="form-text">Name: {first_name}</Card.Title>
          <Card.Text class="form-text">Age: {age} years old</Card.Text>
          <card class="container">
          <button class="button" variant='secondary' onClick={toggleForm}>Edit your profile</button>
          {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
          <button class="button" variant='secondary' onClick={toggleCarForm}>Create a new car</button>
          {seeCreateCar ? <NewCarForm seeCreateCar={seeCreateCar} saveNewCar={saveNewCar} setCars={setCars} addDriveToUser={addDriveToUser}/> : null}
          <button class="button" variant='secondary' onClick={toggleDriveForm}>Create a new drive!</button>
          {seeDriveForm ? <NewDriveForm seeDriveForm={seeDriveForm} saveNewDrive={saveNewDrive} setNewDrive={setNewDrive} currentDriver={currentDriver} addDriveToUser={addDriveToUser}/> : null}
          </card>
          </Card>
      </Container>
      <h2 class="form-text">My joy rides:</h2>
      <div class="container">
      {mappedCars}
      </div>
      <footer>
      <button class="button" variant='secondary'onClick={handleDelete}> Delete account</button>
      </footer> 
      </div> 
  )
}

export default DriverProfile