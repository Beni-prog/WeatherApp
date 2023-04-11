import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  apiKey = `${environment.apiKey}`;
  weatherApiUrl: string;
  forecastApiUrl: string;
  weatherIcon: string = '';
  temperature: string = '';
  humidity: string = '';
  windSpeed: string = '';
  city: string = '';

    ngOnInit() {
        //get the user's current location
        navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        this.forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        fetch(this.weatherApiUrl)
           .then((response: Response) => response.json())
           .then((data: any) => {
              this.city = data.name;
              console.log(this.city)
              // update the weather information on the page
              document.getElementById("weather-icon")?.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
              document.getElementById("weather-city")!.textContent = `${data.name}`;
              document.getElementById("weather-temperature")!.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
              document.getElementById("weather-humidity")!.textContent = `${data.main.humidity}%`;
              document.getElementById("weather-wind")!.textContent = `${data.wind.speed} m/s`;
              document.getElementById("weather-description")!.textContent = `${data.weather[0].description}`;
              document.getElementById("weather-visibility")!.textContent = `${data.visibility} m`;

           })
           .catch((error: any) => console.error(error));
        fetch(this.forecastApiUrl)
            .then((response: Response) => response.json())
            .then((data: any) => {
               this.city = data.name;
               // update the weather information on the page
               document.getElementById("forecast-weather-icon")?.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
               document.getElementById("forecast-weather-city")!.textContent = `${data.city.name}`;
               document.getElementById("forecast-weather-temperature")!.textContent = `${Math.round(data.list[0].main.temp - 273.15)}°C`;
               document.getElementById("forecast-weather-humidity")!.textContent = `${data.list[0].main.humidity}%`;
               document.getElementById("forecast-weather-wind")!.textContent = `${data.list[0].wind.speed} m/s`;
               document.getElementById("forecast-weather-description")!.textContent = `${data.list[0].weather[0].description}`;
               document.getElementById("forecast-weather-visibility")!.textContent = `${data.list[0].visibility} m`;

            })
        });
    }

  getWeather(city: string): boolean {
      this.weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
      fetch(this.weatherApiUrl)
        .then((response: Response) => response.json())
        .then((data: any) => {
          document.getElementById("weather-icon")?.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
          document.getElementById("weather-city")!.textContent = `${data.name}`;
          document.getElementById("weather-temperature")!.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
          document.getElementById("weather-humidity")!.textContent = `${data.main.humidity}%`;
          document.getElementById("weather-wind")!.textContent = `${data.wind.speed} m/s`;
          document.getElementById("weather-description")!.textContent = `${data.weather[0].description}`;
          this.getForecast(data.name);
        })
        .catch((error: any) => {
            window.alert('An error occurred. Please try again later.');
          });
      return false; // Prevent form submission
  }

  getForecast(city: string): boolean {
    this.forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`;

    fetch(this.forecastApiUrl)
      .then((response: Response) => response.json())
      .then((data: any) => {
        document.getElementById("forecast-weather-icon")?.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
        document.getElementById("forecast-weather-city")!.textContent = `${data.city.name}`;
        document.getElementById("forecast-weather-temperature")!.textContent = `${Math.round(data.list[0].main.temp - 273.15)}°C`;
        document.getElementById("forecast-weather-humidity")!.textContent = `${data.list[0].main.humidity}%`;
        document.getElementById("forecast-weather-wind")!.textContent = `${data.list[0].wind.speed} m/s`;
        document.getElementById("forecast-weather-description")!.textContent = `${data.list[0].weather[0].description}`;
      })
      .catch((error: any) => {
      console.log(error);
        window.alert('An error occurred. Please try again later.');
      });
    return false; // Prevent form submission
  }

  subscribeToForecast(number: string): boolean {
    fetch(this.forecastApiUrl)
          .then((response: Response) => response.json())
          .then((data: any) => {
            window.alert('TO BE IMPLEMENTED!!!');
          }).catch((error: any) => {
                  console.log(error);
                    window.alert('TO BE IMPLEMENTED!!!');
                  });
    return false;
  }

}
