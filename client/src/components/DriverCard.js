import React from 'react'
import { Col,Card } from 'react-bootstrap';


function DriverCard({first_name, zip_code, profile_picture}) {

    return (
        <Col>
          <Card style={{ width: '16rem' }}>
            <Card.Img src={profile_picture} alt= "name" height={250} width={180}/>
            <Card.Body className="text-center">
              <Card.Title className="fs-3">{first_name}</Card.Title>
              <Card.Title className="fs-10 text-mute">{"From zip code: " + zip_code} </Card.Title>
            </Card.Body>
          </Card>
        </Col> 
      )
}

export default DriverCard