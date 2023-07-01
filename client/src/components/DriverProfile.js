import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import NavBar from './NavBar'
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
        Welcome to JoyRide, {currentDriver.first_name}!
        </header>
        <navbar>
          <Button variant='secondary' onClick={()=>history.go(-1)}>Go Back</Button>
          <Button variant='secondary' onClick={handleSignoutClick}>Signout</Button>
          <Button variant='secondary'onClick={handleDelete}> Delete account</Button>
        </navbar>
      
      <Container>
          <Card.Img variant="top" src={profile_picture}/>
          <Card.Title>Name: {first_name}</Card.Title>
          <Card.Text>Age: {age} years old</Card.Text>
            <Button variant='secondary' onClick={toggleForm}>Edit your profile</Button>
            <Button variant='secondary' onClick={()=>history.push("/drivers")}>See all drivers</Button>
            
            
            {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
            <Button variant='secondary' onClick={toggleCarForm}>Create a new car!</Button>
            {seeCreateCar ? <NewCarForm seeCreateCar={seeCreateCar} saveNewCar={saveNewCar} setCars={setCars} addDriveToUser={addDriveToUser}/> : null}
            <Button variant='secondary' onClick={toggleDriveForm}>Create a new drive!</Button>
            {seeDriveForm ? <NewDriveForm seeDriveForm={seeDriveForm} saveNewDrive={saveNewDrive} setNewDrive={setNewDrive} currentDriver={currentDriver} addDriveToUser={addDriveToUser}/> : null}
      </Container> 
      {mappedCars}
      </div> 
  )
}

export default DriverProfile