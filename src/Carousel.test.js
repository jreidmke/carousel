import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel/>)
})


it('matches snapshot', () => {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);

  //fires event so we start on image 2
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //initially shows second image, not first. 
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it(" removes the arrows at min and max cardIdx", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);
  let leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //expects left arrow to not be present and right arrow to be present
  expect(rightArrow).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  leftArrow = queryByTestId("left-arrow");

  expect(rightArrow).not.toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
})
