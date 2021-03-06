import React, { Component } from "react";
import DeleteBtn from "./DeleteBtn";		
import { Input, FormBtn } from "./Form";		
import { Col, Row, Container } from "./Grid";
import Jumbotron from "./Jumbotron";
import Nav from "./Nav";		
import API from "../utils/API";		
import { Link } from "react-router-dom";
import Chart from "./Chart";

const Dashboard = () =>

<div>
    <Jumbotron>
      <h1 className="heading">Dashboard</h1>
      <p className="sub-heading">Quickly See Weekly Sales Progress</p>
    </Jumbotron>

    {/* Dashboard Content */}
    <Chart />
</div>

export default Dashboard;
