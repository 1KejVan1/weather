import React from "react";

import styles from "./list.module.css";

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={styles.list}>
        {Array.from({ length: 5 }).map((item) => (
          <li className={styles.list_item}>
            <span className={styles.list_item_title}>Влажность</span>
            <span>100%</span>
          </li>
        ))}
      </ul>
    );
  }
}
