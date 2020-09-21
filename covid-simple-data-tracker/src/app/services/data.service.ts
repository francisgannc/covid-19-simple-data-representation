import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Country, CountryInfo, MoreInfo, SpecificCountryData, SpecificCountryStatusData, TestingData, WorldStats } from '../models/models';

@Injectable()
export class DataService {
  apiURLBase = 'https://api.covid19api.com';
  premium = '/premium/country';

  token = '5cf9dfd5-3449-485e-b5ae-70a60e997864';

  authHeaders = new HttpHeaders({
    'X-Access-Token': this.token,
    Authorization: this.token,
  });

  xAccessTokenHeader = new HttpHeaders({
    'X-Access-Token': this.token,
  });

  constructor(private http: HttpClient) {}

  getWorldTotal(): Observable<WorldStats> {
    return this.http.get<WorldStats>(`${this.apiURLBase}/world/total`);
  }

  getAllCountryInfo(): Observable<CountryInfo[]> {
    return this.http.get<any[]>(`${this.apiURLBase}/countries`).pipe(
      map((response) =>
        response.map((res) => {
          let value: CountryInfo = {
            country: res.Country,
            slug: res.Slug,
          };
          return value;
        })
      )
    );
  }

  getSummary(): Observable<Country[]> {
    return this.http
      .get<any>(`${this.apiURLBase}/summary`, {
        headers: this.xAccessTokenHeader,
      })
      .pipe(
        map((response) =>
          response.Countries.map((res) => {
            let value: Country = {
              country: res.Country,
              date: res.Date,
              newConfirmed: res.NewConfirmed,
              totalConfirmed: res.TotalConfirmed,
              newDeaths: res.NewDeaths,
              totalDeaths: res.TotalDeaths,
              newRecovered: res.NewRecovered,
              totalRecovered: res.TotalRecovered,
            };
            return value;
          })
        )
      );
  }

  getAllByCountry(country: string): Observable<SpecificCountryData[]> {
    const _lessADay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 8
    );
    let today = moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      )
    ).format('YYYY-MM-DD');
    let lessAday = moment(_lessADay).format('YYYY-MM-DD');

    const apiUrl = `${this.apiURLBase}/country/${country}?from=${lessAday}T00:00:00Z&to=${today}T00:00:00Z`;

    return this.http.get<any[]>(apiUrl).pipe(
      map((response) =>
        response.map((res) => {
          let value: SpecificCountryData = {
            country: res.Country,
            date: res.Date,
            confirmed: res.Confirmed,
            deaths: res.Deaths,
            recovered: res.Recovered,
            active: res.Active,
          };
          return value;
        })
      )
    );
  }

  getByCountryStatus(
    country: string,
    status: string
  ): Observable<SpecificCountryStatusData[]> {
    const _lessADay = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 8
    );
    let today = moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      )
    ).format('YYYY-MM-DD');
    let lessAday = moment(_lessADay).format('YYYY-MM-DD');

    const apiUrl = `${this.apiURLBase}/country/${country}/status/${status}?from=${lessAday}T00:00:00Z&to=${today}T00:00:00Z`;

    return this.http.get<any[]>(apiUrl).pipe(
      map((response) =>
        response.map((res) => {
          let value: SpecificCountryStatusData = {
            country: res.Country,
            date: res.Date,
            status: res.Status,
            cases: res.Cases,
          };
          return value;
        })
      )
    );
  }

  getMoreInfo(country: string): Observable<MoreInfo[]> {
    return this.http
      .get<any[]>(`${this.apiURLBase}${this.premium}/data/${country}`, {
        headers: this.authHeaders,
      })
      .pipe(
        map((response) =>
          response.map((res) => {
            let value: MoreInfo = {
              country: res.Country,
              continent: res.Continent,
              population: res.Population,
              populationDensity: res.PopulationDensity,
              medianAge: res.MedianAge,
              aged65Older: res.Aged65Older,
              aged70Older: res.Aged70Older,
              cvdDeathRate: res.CvdDeathRate,
              diabetesPrevalence: res.DiabetesPrevalence,
              handwashingFacilities: res.HandwashingFacilities,
              hospitalBedsPerThousand: res.HospitalBedsPerThousand,
              lifeExpectancy: res.LifeExpectancy,
            };
            return value;
          })
        )
      );
  }

  getTestingData(country: string): Observable<TestingData[]> {
    return this.http
      .get<any[]>(`${this.apiURLBase}${this.premium}/testing/${country}`, {
        headers: this.authHeaders,
      })
      .pipe(
        map((response) =>
          response.map((res) => {
            let value: TestingData = {
              country: res.Entity,
              date: res.Date,
              source: res.Source,
              sourceURL: res.SourceURL,
              notes: res.Notes,
              dailyChangeCumulativeTotal: res.DailyChangeCumulativeTotal,
              cumulativeTotal: res.CumulativeTotal,
              dailyChangeCumulativeTotalPerThousand: res.DailyChangeCumulativeTotalPerThousand,
              cumulativeTotalPerThousand: res.CumulativeTotalPerThousand,
              sevenDaySmoothedDailyChange: res.SevenDaySmoothedDailyChange,
              sevenDaySmoothDailyChangePerThousand: res.SevenDaySmoothDailyChangePerThousand,
            };
            return value;
          })
        )
      );
  }
}
