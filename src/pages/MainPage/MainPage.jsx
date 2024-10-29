import React from "react";

import Countries from "countries-api";

import { Button } from "../../components/Buttons/DefaultButton/Button";
import { TextInput } from "../../components/TextInputs/DefaultTextInput/TextInput";
import { WeatherCard } from "../../components/WeatherCard/WeatherCard";
import styles from "./page.module.css";

const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
const options = {
  method: "POST",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_OPTIONS_API_KEY,
    "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      countryName: "",
      weather: {},
    };
    this.fetchCityCoordinats = this.fetchCityCoordinats.bind(this);
    this.fetchAll = this.fetchAll.bind(this);
    this.setCityName = this.setCityName.bind(this);
    this.setCountryName = this.setCountryName.bind(this);
    this.translateCountryName = this.translateCountryName.bind(this);
    this.getCountryCode = this.getCountryCode.bind(this);
  }

  async fetchAll() {
    const translatedName = await this.translateCountryName();
    const countryCode = this.getCountryCode(translatedName);
    if (countryCode) {
      const [lat, lon] = await this.fetchCityCoordinats(countryCode);

      if (!lat && !lon) {
        alert("Город не найден. Попробуйте ввести название по-другому.");
      } else {
        await this.fetchWeather(lat, lon);
      }
    } else {
      alert("Страна не найдена. Попробуйте ввести название по-другому.");
    }
  }

  async translateCountryName() {
    const response = await fetch(url, {
      ...options,
      body: JSON.stringify({
        q: this.state.countryName,
        source: "ru",
        target: "en",
      }),
    });

    if (response.ok) {
      const obj = await response.json();
      return obj.data.translations.translatedText;
    } else {
      console.log(response.statusText);
    }
  }

  getCountryCode(countryName) {
    const country = Countries.findByName(countryName);

    if (!country.error) {
      return country.data[0].cca2;
    } else {
      return null;
    }
  }

  async fetchCityCoordinats(countryCode) {
    let lat = 0,
      lon = 0;
    const cityResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityName}&limit=10&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=ru&units=metric`,
    );

    if (weatherResponse.ok) {
      const obj = await weatherResponse.json();
      const weather = {
        discription:
          obj.weather[0].description[0].toUpperCase() +
          obj.weather[0].description.slice(1),
        temp: obj.main.temp,
        feels_like: obj.main.feels_like,
        pressure: obj.main.pressure,
        humidity: obj.main.humidity,
        visibility: obj.visibility,
        wind_speed: obj.wind.speed,
        gust: obj.wind.gust,
        clouds: obj.clouds.all,
        iconId: obj.weather[0].icon,
      };

      this.setState({ weather: weather });
    }
  }

  setCityName(cityName = "") {
    this.setState({ cityName: cityName });
  }

  setCountryName(countryName = "") {
    this.setState({ countryName: countryName });
  }

  componentDidMount() {
    console.log(import.meta.env.VITE_OPTIONS_API_KEY);
    console.log(import.meta.env.VITE_WEATHER_API_KEY);
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

        <div>
          {Object.keys(this.state.weather).length > 0 && (
            <WeatherCard weather={this.state.weather} />
          )}
        </div>
      </div>
    );
  }
}
