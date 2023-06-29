import {useEffect, useState} from 'react'
import DriverCard from './DriverCard'; 
// import NavBar from './NavBar';

function DriverCollection() {

  const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch("/api/v1/drivers")
        .then(response => response.json())
        .then(data => {
          setDrivers(data)
        })
      }, []) 

    const mappedDrivers = drivers.map(driver => <DriverCard key={driver.id} {...driver}/>)

  return (

    <div>
      {/* <NavBar/> */}
      {mappedDrivers}
    </div>
  )
}

export default DriverCollection