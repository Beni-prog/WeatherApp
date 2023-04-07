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
  apiUrl: string;
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
        this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
        fetch(this.apiUrl)
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
        });
    }

  getWeather(city: string): boolean {
      this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
      fetch(this.apiUrl)
        .then((response: Response) => response.json())
        .then((data: any) => {
          document.getElementById("weather-icon")?.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
          document.getElementById("weather-city")!.textContent = `${data.name}`;
          document.getElementById("weather-temperature")!.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
          document.getElementById("weather-humidity")!.textContent = `${data.main.humidity}%`;
          document.getElementById("weather-wind")!.textContent = `${data.wind.speed} m/s`;
          document.getElementById("weather-description")!.textContent = `${data.weather[0].description}`;
        })
        .catch((error: any) => console.error(error));
      return false; // Prevent form submission
  }

}
