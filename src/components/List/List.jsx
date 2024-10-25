import React from "react";

import styles from "./list.module.css";

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={styles.list}>
        {this.props.fields.map((item) => (
          <li className={styles.list_item}>
            <span className={styles.list_item_title}>{item.rus_title}</span>
            <span>{this.props.objects[item.eng_title]}</span>
          </li>
        ))}
      </ul>
    );
  }
}
