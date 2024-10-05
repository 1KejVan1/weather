import React from "react";

import styles from "./button.module.css";

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button className={styles.button} onClick={this.handleOnClick}>
        {this.props.children}
      </button>
    );
  }
}
