import React, { Component } from "react";
import { BASE_URL, GET_CITIZEN } from "../../config/Constants.json";
import axios from "axios";
import CitizenName from './CitizenName';
import DateConverter from './DateConverter';

export default class HomePageCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      citizenID: "",
      todaysDate: '',
      lastWeeksDate: ''
    };
  }

  componentDidMount = () => {
    this.setState({ citizenID: this.props.match.params.id });

    let today = new Date();
    let todaysDate = DateConverter(today);
    this.setState({ todaysDate: todaysDate});

    let lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    let lastWeeksDate = DateConverter(lastWeek);

    this.setState({ lastWeeksDate: lastWeeksDate })

    axios
      .post(`${BASE_URL}${GET_CITIZEN}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        this.setState({ personList: response.data });
        console.log(this.state.personList);
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  handleClick = ({ target: { name } }) => {
    console.log(this.state.lastWeeksDate);
    console.log(this.state.todaysDate);
    console.log(this.state.citizenID);
    if (name === "vehicles") {
      this.props.history.push(`/CitizenVehicles/${this.state.citizenID}`);
    }
    if (name === "financials") {
      this.props.history.push(`/CitizenFinancials/${this.state.citizenID}`);
    }
    if (name === "associates") {
      this.props.history.push(`/CitizenAssociates/${this.state.citizenID}`);
    }
    if (name === "whereabouts") {
      this.props.history.push(`/CitizenMap/${this.state.citizenID}/${this.state.lastWeeksDate}/${this.state.todaysDate}`);
    }
  };

  render() {
    const person = this.state.personList;
    return (
      <div>
        <CitizenName forenames={person.forenames} surname={person.surname}></CitizenName>
        <p>Citizen ID: {person.citizenID}</p>
        <p>Date of birth: {person.dateOfBirth}</p>
        <p>Place of birth: {person.placeOfBirth}</p>
        <p>
          Address: {person.streetName} {person.city} {person.postcode}
        </p>

        <button onClick={this.handleClick} name="vehicles">
          Vehicles
        </button>
        <button onClick={this.handleClick} name="financials">
          Financials
        </button>
        <button onClick={this.handleClick} name="whereabouts">Whereabouts</button>
        <button onClick={this.handleClick} name="associates">
          Associates
        </button>
      </div>
    );
  }
}



