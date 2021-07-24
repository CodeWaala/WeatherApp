import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WeatherTile from "../WeatherTile";
import { weatherDataMock } from "../../Helpers/WeatherDataMock";

describe("Weather Tile", () => {
  test("fetches weather of city if not provided", () => {
    const cityName = "Paris";
    const getWeatherData = jest.fn();
    const weatherData = undefined;
    render(
      <WeatherTile
        cityName={cityName}
        getWeatherData={getWeatherData}
        weatherData={weatherData}
      />
    );

    expect(getWeatherData).toHaveBeenCalledWith(cityName);
  });

  test("fetches weather of city if not provided", () => {
    const cityName = "Paris";
    const getWeatherData = jest.fn();
    const weatherData = weatherDataMock;
    const weatherTile = render(
      <WeatherTile
        cityName={cityName}
        getWeatherData={getWeatherData}
        weatherData={weatherData}
      />
    );
    expect(weatherTile).toMatchSnapshot();
  });

  test("shows error properly when there is error", () => {
    const cityName = "Paris";
    const getWeatherData = jest.fn();
    const errorData = "an error happened while fetching data!";
    const weatherTile = render(
      <WeatherTile
        cityName={cityName}
        getWeatherData={getWeatherData}
        errorData={errorData}
      />
    );
    expect(weatherTile).toMatchSnapshot();
  });
});
