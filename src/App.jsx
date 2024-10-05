import React from "react";

import { MainPage } from "./pages/MainPage/MainPage";

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <MainPage />
      </>
    );
  }
}
