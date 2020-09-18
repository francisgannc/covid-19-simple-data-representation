import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export interface Country extends Global {
  country: string;
  date: string;
}

export interface Global {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface Summary {
  Countries: any[];
  Date: string;
  Global: Global;
  Message: string;
}

export interface WorldStats {
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface CountryInfo {
  Country: string;
  Slug: string;
  ISO2: string;
}

export interface SpecificCountryData {
  Country: string;
  Date: string;
  Confirmed: number;
  Recovered: number;
  Deaths: number;
  Active: number;
}

export interface SpecificCountryStatusData {
  Country: string;
  Date: string;
  Status: number;
  Cases: number;
}

export interface MoreInfo {
  Country: string;
  Continent: string;
  Population: number;
  PopulationDensity: number;
  MedianAge: number;
  Aged65Older: number;
  Aged70Older: number;
  ExtremePoverty: number;
  CvdDeathRate: number;
  DiabetesPrevalence: number;
  HandwashingFacilities: number;
  HospitalBedsPerThousand: number;
  LifeExpectancy: number;
  FemaleSmokers: number;
  MaleSmokers: number;
}

@Injectable()
export class DataService {
  apiURLBase = 'https://api.covid19api.com';

  constructor(private http: HttpClient) {}

  getWorldTotal(): Observable<WorldStats> {
    return this.http.get<WorldStats>(`${this.apiURLBase}/world/total`);
  }

  getAllCountryInfo(): Observable<CountryInfo[]> {
    return this.http.get<CountryInfo[]>(`${this.apiURLBase}/countries`);
  }

  getSummary(): Observable<Country[]> {
    return this.http
      .get<Summary>(`${this.apiURLBase}/summary`, {
        headers: { 'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864' },
      })
      .pipe(
        map((response) =>
          response.Countries.map((res) => {
            let country: Country = {
              country: res.Country,
              date: res.Date,
              newConfirmed: res.NewConfirmed,
              totalConfirmed: res.TotalConfirmed,
              newDeaths: res.NewDeaths,
              totalDeaths: res.TotalDeaths,
              newRecovered: res.NewRecovered,
              totalRecovered: res.TotalRecovered,
            };
            return country;
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

    return this.http.get<SpecificCountryData[]>(apiUrl).pipe(
      map((response) =>
        response.map((res) => {
          let country: SpecificCountryData = {
            Country: res.Country,
            Date: res.Date,
            Confirmed: res.Confirmed,
            Deaths: res.Deaths,
            Recovered: res.Recovered,
            Active: res.Active,
          };
          return country;
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

    return this.http.get<SpecificCountryStatusData[]>(apiUrl).pipe(
      map((response) =>
        response.map((res) => {
          let country: SpecificCountryStatusData = {
            Country: res.Country,
            Date: res.Date,
            Status: res.Status,
            Cases: res.Cases,
          };
          return country;
        })
      )
    );
  }

  getMoreInfo(country: string): Observable<MoreInfo> {
    return this.http
      .get<MoreInfo>(`${this.apiURLBase}/premium/country/data/${country}`, {
        headers: {
          'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
          Authorization: '5cf9dfd5-3449-485e-b5ae-70a60e997864',
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
