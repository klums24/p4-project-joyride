import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CarCard({}) {

    return (
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img src={image} alt= "name" height={200} width={150}/>
            <Card.Body className="text-center">
              <Card.Title className="fs-3">{name}</Card.Title>
              <Card.Title className="fs-10 text-mute"> Display Cars </Card.Title>
              <Link to={`/cars/${id}`}> <Button variant="primary"> See Car </Button> </Link>{' '}
            </Card.Body>
          </Card>
        </Col> 
      )
}

export default CarCard