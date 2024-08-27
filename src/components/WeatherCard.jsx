import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className="columns is-mobile is-vcentered">
                <div className="column">
                  <p className="title is-4">
                    {weather.location.name}, {weather.location.region}
                  </p>
                  <p className="subtitle is-5">{weather.current.temp_f}°F</p>
                  <p className="is-size-6">{weather.current.condition.text}</p>
                </div>
                <div className="column is-narrow">
                  <figure className="image is-96x96">
                    <img
                      src={weather.current.condition.icon}
                      alt="weather icon"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
