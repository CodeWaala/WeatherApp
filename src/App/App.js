import "./App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getTomorrowsDate } from "../Helpers/dateHelper";
import WeatherTile from "../WeatherTile/WeatherTile";
import { cityDetailsApiUrl, cityWeatherByIdUrl } from "../constants";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: {}, // weather data for different cities.
      errorData: {} // error data for different cities.
    };

    this.getWeatherData = this.getWeatherData.bind(this);
  }

  render() {
    const { weatherData, errorData } = this.state;
    const { cityNames } = this.props;
    return (
      <Container className="App">
        <header className="App-header">Weather App</header>
        <Row>
          {cityNames.length ? (
            cityNames.map(aCityName => {
              return (
                <Col key={aCityName}>
                  <WeatherTile
                    cityName={aCityName}
                    getWeatherData={this.getWeatherData}
                    weatherData={weatherData[aCityName]}
                    errorData={errorData[aCityName]}
                  />
                </Col>
              );
            })
          ) : (
            <div data-testid="noCityMessageContainer">
              No city to show the weather of!
            </div>
          )}
        </Row>
      </Container>
    );
  }

  async getWeatherData(cityName) {
    let { weatherData } = this.state;
    // make api calls, first to fetch the information of cities.
    const aCityDetailUrl = `${cityDetailsApiUrl}${cityName}`;
    try {
      const response = await fetch(aCityDetailUrl);
      const cityDetails = await response.json();

      const { woeid } = cityDetails[0];
      const { day, month, year } = getTomorrowsDate();
      const cityWeatherUrl = `${cityWeatherByIdUrl}${woeid}/${year}/${month}/${day}`;
      const cityResponse = await fetch(cityWeatherUrl);
      const cityWeatherData = await cityResponse.json();
      weatherData[cityName] = cityWeatherData[0];
      this.setState({ weatherData });
    } catch (error) {
      const { errorData } = this.state;
      errorData[cityName] = "Could not load data!";
      this.setState({ errorData });
    }
  }
}

export default App;
