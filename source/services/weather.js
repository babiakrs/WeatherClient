export default class WeatherService {
  _apiLang = 'ru';
  _apiBase = 'https://api.weatherapi.com/v1';
  _apiToken = '86e950590bfc46fbb4e183836200304';

  constructor(lang = 'ru') {
    this._apiLang = lang;
  }

  async getForecast(coord) {
    const res = await fetch(`${this._apiBase}/forecast.json?key=${this._apiToken}&lang=${this._apiLang}&q=${coord}&days=7`);

    if (!res.ok) {
      console.error(`Request error: ${res.status}`);
    }

    return await res.json();
  }
}