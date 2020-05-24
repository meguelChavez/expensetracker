import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/Views/HomePage";
import NavBar from "./components/NavBar/NavBar";

class App extends Component {
  state = {
    isOpen: false,
    isAuthed: false,
    loginForm: false
  };

  // componentDidMount() {
  //   axios.get("/api/helloworld").then(res => {
  //     console.log("a;lskdfj;kj");
  //     console.log(res);
  //   });
  // }

  componentDidMount() {
    console.log("mounted");
    this.checkAuth();
    // this.auth();
  }

  checkAuth = async () => {
    try {
      const authResults = await axios.get("/auth/login/success");
      console.log(authResults);
      let user;
      let isAuthed;
      if (authResults.data.user) {
        isAuthed = true;
        user = authResults.data.user;
      } else {
        isAuthed = false;
        user = null;
      }
      this.setState({ isAuthed, user });
    } catch (err) {
      console.log(err);
    }
  };

  auth = () => {
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          isAuthed: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  };

  toggle = (name, value) => {
    // this.setState({ [name]: !this.state[name] });
    this.setState({ [name]: value });
  };

  handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    this.setState({ isAuthed: false });
    window.open("http://localhost:3001/auth/logout", "_self");
    // this.props.handleNotAuthenticated();
  };

  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <NavBar
            isAuthed={this.state.isAuthed}
            handleLogoutClick={this.handleLogoutClick}
            toggle={this.toggle}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  {...this.props}
                  isAuthed={this.state.isAuthed}
                  toggle={this.toggle}
                  loginForm={this.state.loginForm}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
