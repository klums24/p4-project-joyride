import React from 'react'
import DriverCard from './DriverCard';
import { Container, Row } from 'react-bootstrap'
import {useState, useEffect} from 'react';

function DriverCollection() {
  const [drivers, setDrivers] = useState([]);

  const mappedDrivers = drivers.map(driver => <DriverCard key={driver.id} {...driver} />)

  return (
    <Container>
      <Row>
        {mappedDrivers}
      </Row>
    </Container>
  );
}

export default DriverCollection