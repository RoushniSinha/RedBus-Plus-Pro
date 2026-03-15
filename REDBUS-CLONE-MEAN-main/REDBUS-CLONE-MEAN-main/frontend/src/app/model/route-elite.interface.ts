export interface ILatLng {
  lat: number;
  lng: number;
  label?: string;
}

export interface IWaypoint {
  name: string;
  position: ILatLng;
  type: 'rest-stop' | 'city' | 'landmark';
  estimatedArrival?: string;
}

export interface IRouteElite {
  id?: string;
  origin: string;
  destination: string;
  waypoints: IWaypoint[];
  totalDistance: number;
  estimatedDuration: number;
  trafficIndex: number;
  polyline?: ILatLng[];
}
