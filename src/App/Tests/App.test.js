import { render, screen, within } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("App tests", () => {
  test("renders proper message when no cities to render weather of", () => {
    const { getByTestId } = render(<App cityNames={[]} />);
    const { getByText } = within(getByTestId("noCityMessageContainer"));
    expect(getByText("No city to show the weather of!")).toBeInTheDocument();
  });

  test("renders weather tile properly for each city, in loading state", () => {
    const app = render(<App cityNames={["Rome", "Paris", "Delhi"]} />);
    expect(app).toMatchSnapshot();
  });
});
