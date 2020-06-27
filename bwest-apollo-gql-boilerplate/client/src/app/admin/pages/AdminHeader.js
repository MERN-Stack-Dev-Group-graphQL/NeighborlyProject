import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';

function AdminHeader() {
  const { user } = useContext(AuthContext);

  return (
    <NavbarWrapper>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>...</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Form inline className='ml-auto mr-2'>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form>
          <Nav className='x'>
            <NavDropdown title={<FaBell />} id='nav-notification-dropdown' className='nav-notification'>
              <NavDropdown.Item href='#action/3.1'>New Rental</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Refund Request</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Tool Delivered</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Something Else</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#link'></Nav.Link>
            <Nav.Link href='#home'>
              <div className='avatar-container'>
                <div className='avatar'>
                  <img src={`http://localhost:4000/assets/img/avatar-default.png`} alt='Avatar' />
                </div>
                <div className='username'>{`${user.firstName} ${user.lastName}`}</div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavbarWrapper>
  );
}

export default AdminHeader;

const NavbarWrapper = styled.div`
  .nav-container {
  }

  .nav-notification {
  }

  .avatar-container {
    display: flex;

    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 8px;

      img {
        width: 100%;
      }
    }
  }
`;
