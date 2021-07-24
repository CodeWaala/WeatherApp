import "./WeatherTile.css";
import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { weatherIcon } from "../constants";

class WeatherTile extends React.Component {
  render() {
    const { weatherData, cityName, errorData } = this.props;

    if (errorData) {
      return (
        <Card>
          <Button variant="secondary" disabled>
            {errorData}
          </Button>
        </Card>
      );
    } else if (!weatherData) {
      //   return <Card> {`Getting weather for: ${cityName}`} </Card>;
      return (
        <Card>
          <Button variant="secondary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </Card>
      );
    } else {
      const {
        weather_state_abbr,
        applicable_date,
        min_temp,
        max_temp
      } = weatherData;
      return (
        <>
          <Card>
            <Card.Img
              variant="top"
              src={`${weatherIcon}${weather_state_abbr}.png`}
            />
            <Card.Body>
              <Card.Title>{cityName}</Card.Title>
              <p>{applicable_date}</p>
              <p>Min: {min_temp.toFixed(2)} &#8451;</p>
              <p>Max: {max_temp.toFixed(2)} &#8451;</p>
            </Card.Body>
          </Card>
        </>
      );
    }
  }

  componentDidMount() {
    const { weatherData, getWeatherData, cityName } = this.props;
    if (!weatherData && getWeatherData) {
      getWeatherData(cityName);
    }
  }
}

export default WeatherTile;
