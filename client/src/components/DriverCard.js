import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function DriverCard({first_name, age, zip_code, profile_picture, id }) {

    return (
      <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Img src={profile_picture} alt= "profile_pic" height={200} width={150}/>
        <Card.Body class="text-center">
          <Card.Title class="form-text">{first_name}</Card.Title>
          <Card.Title class="form-text">{zip_code}</Card.Title>
          <Card.Title class="form-text">{age > 1? age + " years old" : age + " year old"} </Card.Title>
          <Link to={`/drivers/${id}`}> <Button class="button" variant="primary"> See Profile </Button> </Link>{' '}
        </Card.Body>
      </Card>
    </Col>
      )
}

export default DriverCard