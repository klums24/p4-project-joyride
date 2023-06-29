import React from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import NavBar from './NavBar'

function DriverProfile({currentDriver, handleSignoutClick}) {
  const history = useHistory()
  // const {id, username, email} = currentDriver

//   // console.log(currentDriver.id)
//   return (
//     <div>{currentDriver.first_name}</div>
//   )
// }

const {first_name, age, profile_picture} = currentDriver

return (
  <div>
  <NavBar/>
  <Container>
    <header> Joy Ride </header>
      <Card.Title>Name: {first_name}</Card.Title>
      <Card.Text>Age: {age} years old</Card.Text>
      <Button variant='secondary' onClick={()=>history.go(-1)}>Go Back</Button>
      <Button variant='secondary' onClick={handleSignoutClick}>Signout</Button>
      <Button variant='secondary' onClick={handleSignoutClick}>See all cars</Button>
      <Button variant='secondary' onClick={handleSignoutClick}>See all drives</Button>

  </Container>  
  </div>
)
}

export default DriverProfile