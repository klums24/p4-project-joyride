import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DriveCard({}) {

    return (
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img src={} alt= "name" height={200} width={150}/>
            <Card.Body className="text-center">
              <Card.Title className="fs-3">{name}</Card.Title>
              <Card.Title className="fs-10 text-mute"> Display Drives </Card.Title>
              <Link to={`/cars/${id}`}> <Button variant="primary"> See Drives </Button> </Link>{' '}
            </Card.Body>
          </Card>
        </Col> 
      )
}

export default DriveCard