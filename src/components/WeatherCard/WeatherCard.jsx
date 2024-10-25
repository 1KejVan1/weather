import React from "react";

import { fieldsNamesArray } from "../../constants";
import { List } from "../List/List";
import styles from "./weathercard.module.css";

export class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.container_header}>
          <div className={styles.container_image}>
            <img
              className={styles.image}
              src={`https://openweathermap.org/img/wn/${this.props.weather.iconId}@2x.png`}
            />
          </div>
          <div className={styles.header_title}>
            <div className={styles.degrees_text}>
              {this.props.weather.temp} °C
            </div>
            <div className={styles.feels_like_text}>
              Ощущается как {this.props.weather.feels_like} °C
            </div>
          </div>
        </div>
        <div className={styles.discription_text}>
          {this.props.weather.discription}
        </div>
        <List objects={this.props.weather} fields={fieldsNamesArray} />
      </div>
    );
  }
}

WeatherCard.defaultProps = { weather: {} };
