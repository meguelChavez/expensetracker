import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGoogle,
  faGooglePlus
} from "@fortawesome/free-brands-svg-icons";
import NavBar from "../NavBar/NavBar";
import LogIn from "../LogIn/LogIn";
import ScanReceipts from './ScanReceipts'


const HomePage = props => {
  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:3001/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:3001/auth/logout", "_self");
    // this.props.handleNotAuthenticated();
  };

  const socialBtns = {
    fontSize: "1.5rem"
  };

  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <Container fluid>
        <div className="jumbotron">
            <h1>Home Page</h1>
            <ScanReceipts/>

          {/* <button onClick={handleSignInClick}>Twitter2</button>
          <button onClick={handleLogoutClick}>Logout</button> */}
        </div>

        {props.loginForm ? <LogIn toggle={props.toggle} /> : null}
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
