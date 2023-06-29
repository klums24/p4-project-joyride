import React from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import NavBar from './NavBar'

function DriverProfile({currentDriver}) {
  const history = useHistory()
  // const {id, username, email} = currentDriver

//   // console.log(currentDriver.id)
//   return (
//     <div>{currentDriver.first_name}</div>
//   )
// }

const {first_name, age, profile_picture} = currentDriver

return (
  <>
  <NavBar/>
  <Container>
    <header> Joy Ride </header>
      <Row className='justify-content-md-center'>
          <Col xs>
              <Card>
              <Card.Img variant="top" src={profile_picture} alt={first_name}/>
              <Card.Body>
                  <Card.Title>Name: {first_name}</Card.Title>
                  <Card.Text>Age: {age} years old</Card.Text>
                  <Button variant='secondary' onClick={()=>history.go(-1)}>Go Back</Button>
              </Card.Body>
              </Card>
          </Col>
      </Row>
  </Container>  
  </> 
)
}

export default DriverProfile