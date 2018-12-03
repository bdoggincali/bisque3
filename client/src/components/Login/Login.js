import React, { Component } from "react";
import { Input, FormBtn } from "../Form";
import { Col, Row, Container } from "../Grid";
import "../../styles/Login.css";
import API from "../../utils/API";
import decode from "jwt-decode";
import Nav from "../Nav";
import Jumbotron from "../Jumbotron";

var chartData1;

class Login extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRegister = event => {
    event.preventDefault();
    console.log("Handling register..Login.js");
    API.registerAccount({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      // .then(res => console.log("you have registered!"))
      .then(res => {
        window.location = "/Login";
        document.getElementsByClassName(".hidden").removeClass("hidden");
      })
      .catch(err => console.log(err));

    //Clear form data after submit
    this.setState({
      username: "",
      password: "",
      passwordConfirm: "",
      email: ""
    });
  };

  handleLogin = event => {
    event.preventDefault();
    console.log("Handling login..Login.js");
    API.loginAccount({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log("res..Login.js: ", res.data.token, this.props);
        // set token to local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        // decode token
        const decoded = decode(res.data.token);
        var sub = decoded.sub;
        console.log("sub: " + sub);
        localStorage.setItem("rep_id", sub);
        console.log("decoded token giving rep_id and timestamp: ", decoded);
        // API.getChartData({
        //            repRepId: localStorage.getItem('rep_id')
        //        })
        //        .then(res => {
        //            console.log("res..Login.js: ", res.data);
        //            localStorage.setItem('chartData1', parseInt(res.data, 10));
        //            chartData1 = localStorage.getItem('chartData1');
        //            console.log('chartData1..Login.js ', chartData1);
        //        })
        //        .catch(err => console.log(err))
        // get dashboard component
        // this.props.history.replace('/private');
      })
      .then(
        res => {
          window.location = "/private";
          document.getElementsByClassName(".hidden").addClass("hidden");
        })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <section id="login-register" className="short-page">
        <Nav />
        <Container>

          <Row>
            <Col size="xs-10 xs-offset-1 sm-8 sm-offset-2 lg-6 lg-offset-3">
              <h2 className="hidden">Your account has been successfully registered. You can now log into your account.</h2>
            </Col>
          </Row>
          <Row>
            <Col size="xs-10 xs-offset-1 sm-8 sm-offset-2 lg-6 lg-offset-3">
              <div className="panel panel-login">
                {/* Panel Heading */}
                <div className="panel-heading">
                  <Row>
                    <Col size="xs-6">
                      <a href="/login" className="active" id="login-form-link">
                        LOGIN
                      </a>
                    </Col>
                    <Col size="xs-6">
                      <a href="/register" id="register-form-link">
                        REGISTER
                      </a>
                    </Col>
                  </Row>
                  {/* <hr /> */}
                </div>
                {/* End of Panel Heading */}

                {/* Panel Body */}
                <div className="panel-body">
                  <Row>
                    <Col size="md-12 sm-12">
                      
                      {/* Login Form */}

                      <form id="login-form" style={{ display: "block" }}>
                        <h2 className="panel-heading"> Welcome Back! </h2>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          tabIndex="1"
                          placeholder="Username *"
                          value={this.state.username}
                          onChange={this.handleInputChange}
                          required
                        />
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          tabIndex="2"
                          placeholder="Password *"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          required
                        />

                        {/* <Input type="checkbox" tabIndex="3" className="" name="remember" id="remember"></Input>
                          <label for="remember">Remember Me</label> */}
                        <Row>
                          <Col size="sm-6 sm-offset-3">
                            <FormBtn
                              type="submit"
                              name="login-submit"
                              id="login-submit"
                              tabIndex="4"
                              className="form-control btn-login"
                              value="Log In"
                              onClick={this.handleLogin}
                            >
                              Log In
                            </FormBtn>
                          </Col>
                        </Row>

                        {/* <Row>
                            <Col size="md-12 sm-12" className="text-center">
                            <a href="" tabIndex="5" className="forgot-password">Forgot Password?</a>
                            </Col>
                          </Row> */}
                      </form>

                      {/* Register Form */}

                      <form id="register-form" style={{ display: "none" }}>
                        <h2 className="panel-heading active"> Sign Up For Free! </h2>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          tabIndex="1"
                          placeholder="Username *"
                          value={this.state.username}
                          onChange={this.handleInputChange}
                          required
                        />
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          tabIndex="1"
                          placeholder="Email Address *"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required
                        />
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          tabIndex="2"
                          placeholder="Password *"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                          required
                        />
                        <Input
                          type="password"
                          name="passwordConfirm"
                          id="confirm-password"
                          tabIndex="2"
                          placeholder="Confirm Password *"
                          value={this.state.passwordConfirm}
                          onChange={this.handleInputChange}
                          required
                        />
                        <Row>
                          <Col size="sm-6 sm-offset-3">
                            <FormBtn
                              type="submit"
                              name="register-submit"
                              id="register-submit"
                              tabIndex="4"
                              className="form-control btn btn-register"
                              value="Register Now"
                              onClick={this.handleRegister}
                            >
                              Register
                            </FormBtn>
                          </Col>
                        </Row>
                      </form>

                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Login;
