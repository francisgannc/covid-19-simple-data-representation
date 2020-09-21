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

export interface WorldStats {
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

export interface CountryInfo {
  country: string;
  slug: string;
}

export interface SpecificCountryData {
  country: string;
  date: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  active: number;
}

export interface SpecificCountryStatusData {
  country: string;
  date: string;
  status: number;
  cases: number;
}

export interface MoreInfo {
  country: string;
  continent: string;
  population: number;
  populationDensity: number;
  medianAge: number;
  aged65Older: number;
  aged70Older: number;
  cvdDeathRate: number;
  diabetesPrevalence: number;
  handwashingFacilities: number;
  hospitalBedsPerThousand: number;
  lifeExpectancy: number;
}

export interface TestingData {
  country: string;
  date: string;
  source: string;
  sourceURL: string;
  notes: string;
  dailyChangeCumulativeTotal: string;
  cumulativeTotal: string;
  cumulativeTotalPerThousand: string;
  dailyChangeCumulativeTotalPerThousand: string;
  sevenDaySmoothedDailyChange: string;
  sevenDaySmoothDailyChangePerThousand: string;
}
