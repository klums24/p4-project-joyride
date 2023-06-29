import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <div>
    <h1>nav bar here</h1>
    </div>
    // <Navbar className="nav" sticky='top' style={{backgroundColor:"rgb(125, 189, 248)"}}>
    //     <Container>
    //         <Navbar.Brand as= {Link} to="/" className="badge fs-2 fw-bold  text-wrap text-dark "style={{fontFamily: 'Perpetua', backgroundColor: "rgb(125, 189, 248)"}} >Joy Ride</Navbar.Brand>
    //         <Navbar.Toggle aria-controls='navbarScroll' />
    //         <Navbar.Collapse id="navbarScroll">
    //         <Nav className="me-auto my-2 my-lg-0" navbarScroll> */
    //         <Nav.Link as= {Link} to="/" className="fw-bold">Home</Nav.Link>
    //         <Nav.Link as= {Link} to="/" className="fw-bold">Sign out</Nav.Link>
    //         </Nav>
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>
  )
}

export default NavBar