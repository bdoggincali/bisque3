import "rc-time-picker/assets/index.css";
import React, { Component } from "react";
import "../Form/DataForm.css";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/calAPI.js";
import PubSub from "pubsub-js";

class CalForm extends Component {
  state = {
    events: [],
    event_title: "",
    date: "",
    start_time: "",
    end_time: "",
    note: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.event_title && this.state.start_time) {
      API.saveEvent({
        event_title: this.state.event_title,
        date: this.state.date,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        note: this.state.note,
        repRepId: localStorage.getItem("rep_id")
      })
        .then(res => {
          console.log("res from post..CalForm", res.data);
          PubSub.publish("UPDATE_LIST", "update Now!");
        })
        .catch(err => console.log(err));
    }

    this.setState({
      event_title: "",
      date: "",
      start_time: "",
      end_time: "",
      note: ""
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="xs-12">
            <form className="form-form-horizontal DataForm" ref="form">
              <h2>Add a New Event to Calendar</h2>
              <Col size="xs-12">
                <Input
                  value={this.state.event_title}
                  onChange={this.handleInputChange}
                  name="event_title"
                  placeholder="Event Title *"
                  required
                />
              </Col>
              <Col size="xs-4">
                <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="date"
                  placeholder="Date MM-DD-YYYY*"
                  required
                />
              </Col>
              <Col size="xs-4">
                <Input
                  value={this.state.start_time}
                  onChange={this.handleInputChange}
                  name="start_time"
                  placeholder="Start Time *"
                  required
                />
              </Col>
              <Col size="xs-4">
                <Input
                  value={this.state.end_time}
                  onChange={this.handleInputChange}
                  name="end_time"
                  placeholder="End Time *"
                  required
                />
              </Col>
              <Col size="xs-12">
                <Input
                  value={this.state.note}
                  onChange={this.handleInputChange}
                  name="note"
                  placeholder="Note"
                />
              </Col>
              <FormBtn
                disabled={!(this.state.event_title && this.state.start_time)}
                onClick={this.handleFormSubmit}
              >
                Add to Calendar
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CalForm;
