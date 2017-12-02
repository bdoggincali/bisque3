import React, { Component } from "react";
import "./CustForm.css";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/custAPI.js";
import PubSub from 'pubsub-js';


class Form extends Component {
  state = {
    customers: [],
    customer_contact: '',
    customer_company: '',
    customer_email: '', 
    customer_address: '',
    customer_phone: '',
    customer_rating:'',
    customer_notes: '',
    customer_visited:'',
    customer_active: ''
  };

  handleInputChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name] : value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.customer_contact && this.state.customer_company) {
      API.saveCusts({
        customer_contact: this.state.customer_contact,
        customer_company: this.state.customer_company,
        customer_email: this.state.customer_email, 
        customer_address: this.state.customer_address,
        customer_phone: this.state.customer_phone,
        // customer_rating: this.state.customer_rating,
        customer_notes: this.state.customer_notes,
        customer_visited: this.state.customer_visited,
        // customer_active: this.state.customer_active,
        repRepId: localStorage.getItem('rep_id')
      })
      .then(res => {
          console.log("res from post..CustForm", res)
          PubSub.publish('UPDATE_LIST', 'update Now!');
        })
      .catch(err => console.log(err));
    }
    
  };
  
  render () {
    return (
      <Container fluid>
      <Row>
        <Col size="md-6">
          <form>
            <Input
              value={this.state.customer_contact}
              onChange={this.handleInputChange}
              name="customer_contact"
              placeholder="Contact Name (required)"
            />
            <Input
              value={this.state.customer_company}
              onChange={this.handleInputChange}
              name="customer_company"
              placeholder="Company Name (required)"
            />
            <Input
              value={this.state.customer_email}
              onChange={this.handleInputChange}
              name="customer_email"
              placeholder="customer email (required)"
            />
            <FormBtn
              disabled={!(this.state.customer_contact && this.state.customer_company)}
              onClick={this.handleFormSubmit}
            >
              Submit Customer
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
}

export default Form;
