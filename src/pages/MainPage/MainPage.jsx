import React from "react";

// import { translateCityName } from "../../api/api";
import { Button } from "../../components/Buttons/DefaultButton/Button";
import { TextInput } from "../../components/TextInputs/DefaultTextInput/TextInput";
import styles from "./page.module.css";

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      countryName: "",
      weather: {},
    };
    this.fetchCountryCode = this.fetchCountryCode.bind(this);
    this.fetchCityCoordinats = this.fetchCityCoordinats.bind(this);
    this.fetchAll = this.fetchAll.bind(this);
    this.setCityName = this.setCityName.bind(this);
    this.setCountryName = this.setCountryName.bind(this);
  }

  async fetchAll() {
    const countryCode = await this.fetchCountryCode();
    const [lat, lon] = await this.fetchCityCoordinats(countryCode);
    this.fetchWeather(lat, lon);
  }

  async fetchCountryCode() {
    const countryResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.countryName}&limit=1&appid=3b2f72a07156e4f1ceac1d71e3e3619d`,
    );

    if (countryResponse.ok) {
      const obj = await countryResponse.json();

      return obj[0].country;
    }
  }

  async fetchCityCoordinats(countryCode) {
    let lat = 0,
      lon = 0;
    const cityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName}&limit=5&appid=3b2f72a07156e4f1ceac1d71e3e3619d`,
    );

    if (cityResponse.ok) {
      const cityArray = await cityResponse.json();

      cityArray.map((city) => {
        if (city.country === countryCode) {
          lat = city.lat;
          lon = city.lon;
        }
      });
    }

    return [lat, lon];
  }

  async fetchWeather(lat = 0, lon = 0) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b2f72a07156e4f1ceac1d71e3e3619d&lang=ru&units=metric`,
    );

    if (weatherResponse.ok) {
      this.setState({ weather: await weatherResponse.json() });
    }
  }

  setCityName(cityName = "") {
    this.setState({ cityName: cityName });
  }

  setCountryName(countryName = "") {
    this.setState({ countryName: countryName });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.input_container}>
          <TextInput
            onChange={this.setCountryName}
            label="Введите название страны"
          />
          <TextInput
            label="Введите название города"
            onChange={this.setCityName}
          />
          <Button onClick={this.fetchAll}>Найти</Button>
        </div>
      </div>
    );
  }
}
