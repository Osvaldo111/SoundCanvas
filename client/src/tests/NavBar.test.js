import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "../components/NavBar";
import { mount, shallow } from "enzyme";
//Redux
import { Provider } from "react-redux";
import store from "../reducers/store";
import { createSerializer } from "enzyme-to-json";
import { spy } from "sinon";
configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

describe("Navigation bar <NavBar />", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("check when the user press the reset button", () => {
    window.alert = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );
    // console.log(wrapper.find("NavBar").instance().props, "************");
    const navBar = wrapper.find("NavBar").instance();
    const navSpy = spy(navBar, "isResetBttnPress");
    navBar.forceUpdate();
    wrapper.find("#resetBttn").simulate("click");
    expect(navSpy.calledOnce).toEqual(true);
  });
});
