import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //   const handleLogoutClick = () => {
  //     // Logout using Twitter passport api
  //     // Set authenticated state to false in the HomePage
  //     window.open("http://localhost:3001/auth/logout", "_self");
  //     // this.props.handleNotAuthenticated();
  //   };

  return (
    <React.Fragment>
      <Navbar color="dark" dark expand="md" className=" fixed-top">
        <NavbarBrand
          href="/"
          className="mr-auto"
          onClick={() => {
            props.toggle("loginForm", false);
          }}
        >
          Home
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            {props.isAuthed ? (
              <NavItem>
                <NavLink href="#" onClick={props.handleLogoutClick}>
                  Log Out
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink
                  href="#"
                  name="loginForm"
                  onClick={() => props.toggle("loginForm", true)}
                >
                  Log In
                </NavLink>
              </NavItem>
            )}

            {/* <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
