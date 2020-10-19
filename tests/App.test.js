import { shallow, render, mount } from "enzyme";
import React from "react";
import Home from "../pages/index.js";

describe("counter testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  test("render text of speak button", () => {
    expect(wrapper.find("button").text()).toContain("Speak");
  });
});
