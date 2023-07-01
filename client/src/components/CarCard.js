import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./style.css"
function CarCard({make, model, year, picture, id, currentDriver}) {

  // const checkUserCar = () => {
  //   return currentDriver.drives.some(drive => drive.car_id === id)
  // }

      // return (
      //   <Card style={cardStyle}>
      //     <Card.Img src={picture} alt="name" style={imageStyle} />
      //     <Card.Body className="text-center">
      //       <Card.Title className="fs-3">Make: {make}</Card.Title>
      //       <Card.Title className="fs-3">Model: {model}</Card.Title>
      //       <Card.Title className="fs-10">Year: {year}</Card.Title>
      //       <Card.Title className="fs-3">Car Id: {id}</Card.Title>
      //       {checkUserCar() ? null: <Link to={`/cars/${id}`}> <Button variant="primary"> Drive Me! </Button> </Link>}
      //     </Card.Body>
      //   </Card>
      // );
      return (
        <div className="car-card">
          <img src={picture} alt="name" className="car-image" />
          <div className="car-details">
            <h3>Make: {make}</h3>
            <h3>Model: {model}</h3>
            <h3>Year: {year}</h3>
            <h3>Car Id: {id}</h3>
            {/* <button className="drive-button">Drive Me!</button> */}
          </div>
        </div>
      );
    
}

export default CarCard