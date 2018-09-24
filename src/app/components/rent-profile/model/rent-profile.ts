
export interface RentProfile {
  html_attributions: any[];
  result: RentResult;
  status: string;
}

export interface RentResult {
  formatted_phone_number: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  rating: number;
  reviews: Review[];
  vicinity: string;
  geometry: RentGeometry;
  formatted_address: string;
}

export interface RentGeometry {
  location: { lat: number, lng: number};
  viewport: {
    northeast: { lat: number, lng: number},
    southwest: { lat: number, lng: number}
  };
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface OpeningHours {
  weekday_text: string[];
}
