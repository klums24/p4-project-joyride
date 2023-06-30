import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CarCard({make, model, year, id}) {

    return (
        <Col>
          <Card style={{ width: '18rem' }}>
            {/* <Card.Img src={picture} alt= "name" height={200} width={150}/> */}
            <Card.Body className="text-center">
              <Card.Title className="fs-3">{make}</Card.Title>
              <Card.Title className="fs-3">{model}</Card.Title>
              <Card.Title className="fs-3">{year}</Card.Title>
              <Card.Title className="fs-10 text-mute"> Display Cars </Card.Title>
              <Link to={`/cars/${id}`}> <Button variant="primary"> See Car </Button> </Link>{' '}
            </Card.Body>
          </Card>
        </Col> 
      )
}

export default CarCard