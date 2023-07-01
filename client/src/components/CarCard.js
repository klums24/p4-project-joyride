import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function CarCard({make, model, year, picture, id, currentDriver}) {

  const checkUserCar = () => {
    return currentDriver.drives.some(drive => drive.car_id === id)
  }
    return (
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img src={picture} alt= "name" height={250} width={250}/>
            <Card.Body className="text-center">
            <Card.Title className="fs-3">Car id: {id}</Card.Title>
              <Card.Title className="fs-3">Make: {make}</Card.Title>
              <Card.Title className="fs-3">Model: {model}</Card.Title>
              <Card.Title className="fs-3">Year: {year}</Card.Title>
              {/* <Card.Title className="fs-10 text-mute"> Display Cars </Card.Title> */}
              {/* {checkUserCar() ? null: <Link to={`/cars/${id}`}> <Button variant="primary"> Drive Me! </Button> </Link>} */}
            </Card.Body>
          </Card>
        </Col> 
      )
}

export default CarCard