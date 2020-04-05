import React from "react";
import ReactDOM from "react-dom";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SideBar from "../components/SideBar";
import { mount, shallow } from "enzyme";
//Redux
import { Provider } from "react-redux";
import store from "../reducers/store";
import { createSerializer } from "enzyme-to-json";
import { spy } from "sinon";
configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

describe("Side bar <SideBar />", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
