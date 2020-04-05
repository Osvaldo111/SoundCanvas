import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "../App";

//Redux
import { Provider } from "react-redux";
import store from "../reducers/store";
import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

describe("App validetion <App />", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });
});
