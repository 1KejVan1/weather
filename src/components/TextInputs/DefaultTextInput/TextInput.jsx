import React from "react";

import styles from "./input.module.css";

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    if (this.props.label) {
      return (
        <label className={styles.label}>
          <span className={styles.text}>{this.props.label}</span>
          <input
            type="text"
            onChange={this.handleOnChange}
            className={styles.input}
          />
        </label>
      );
    } else {
      return (
        <input
          type="text"
          onChange={this.handleOnChange}
          className={styles.input}
        />
      );
    }
  }
}

TextInput.defaultProps = { onChange: Function.prototype };
