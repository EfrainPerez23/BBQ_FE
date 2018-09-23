export interface MapResults {
  html_attributions: any[];
  results: Result[];
  status: string;
}

export interface Result {
  geometry: Geometry;
  icon: string;
  id: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  vicinity: string;
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
