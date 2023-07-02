import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import "./style.css"
function CarCard({make, model, year, picture, id, currentDriver}) {

  // const checkUserCar = () => {
  //   return currentDriver.drives.some(drive => drive.car_id === id)
  // }

      return (
        <Card style={{ width: '18rem' }}>
          <Card.Img src={picture} alt="name" height={200} width={150} />
          <Card.Body className="text-center">
            <Card.Title class="form-text">Make: {make}</Card.Title>
            <Card.Title class="form-text">Model: {model}</Card.Title>
            <Card.Title class="form-text">Year: {year}</Card.Title>
            <Card.Title class="form-text">Car Id: {id}</Card.Title>
            {/* {checkUserCar() ? null: <Link to={`/cars/${id}`}> <Button variant="primary"> Drive Me! </Button> </Link>} */}
          </Card.Body>
        </Card>
      );
      // return (
      //   <div className="car-card">
      //     <img src={picture} alt="name" className="car-image" />
      //     <div className="car-details">
      //       <h3 className="fs-3">Make: {make}</h3>
      //       <h3 className="fs-3">Model: {model}</h3>
      //       <h3 className="fs-3">Year: {year}</h3>
      //       <h3 className="fs-3">Car Id: {id}</h3>
      //       {/* <button className="drive-button">Drive Me!</button> */}
      //     </div>
      //   </div>
      // );
    
}

export default CarCard

// maybe revert to this original styling:
// return (
//   <div className="car-card">
//     <img src={picture} alt="name" className="car-image" />
//     <div className="car-details">
//       <h3 className="fs-3">Make: {make}</h3>
//       <h3 className="fs-3">Model: {model}</h3>
//       <h3 className="fs-3">Year: {year}</h3>
//       <h3 className="fs-3">Car Id: {id}</h3>
//       {/* <button className="drive-button">Drive Me!</button> */}
//     </div>
//   </div>
// );
