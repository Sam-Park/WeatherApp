import React, { Component } from "react";
import axios from "axios";

class SimpleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      main: [],
      FTemp: 0,
      CTemp: 0,
      weather: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=e83f1690006f773d1ea16ca962a6625c"
      )
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          main: response.data.main,
          FTemp: Math.trunc((response.data.main.temp * 9) / 5 - 459.67),
          CTemp: Math.trunc(response.data.main.temp - 273.15),
          weather: response.data.weather[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let IconSrc = `http://openweathermap.org/img/w/${
      this.state.weather.icon
    }.png`;
    console.log("weather", this.state.weather);
    return (
      <div>
        <p>Current Weather for: {this.state.name}</p>
        <p />
        <p>
          FTemp: &deg;
          {this.state.FTemp}
        </p>
        CTemp: &deg;
        {this.state.CTemp}
        <p>
          {this.state.weather.main}
          <br />
          <img src={IconSrc} />
          {this.state.weather.description}
        </p>
      </div>
    );
  }
}

export default SimpleView;
