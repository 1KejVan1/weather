import React from "react";

import styles from "./button.module.css";

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.title, test: {} };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {}

  componentDidMount() {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3b2f72a07156e4f1ceac1d71e3e3619d ",
    )
      .then((res) => res.json())
      .then((res) => this.setState({ test: res }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <button className={styles.button} onClick={this.handleOnClick}>
        {this.state.title}
      </button>
    );
  }
}
