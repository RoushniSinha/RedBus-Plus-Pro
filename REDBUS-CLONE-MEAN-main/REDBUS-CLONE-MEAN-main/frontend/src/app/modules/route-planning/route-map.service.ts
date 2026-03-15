import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Waypoint {
  lat: number;
  lng: number;
  label: string;
}

export interface RouteInfo {
  origin: Waypoint;
  destination: Waypoint;
  waypoints: Waypoint[];
  distanceKm: number;
  durationMin: number;
}

@Injectable({
  providedIn: 'root'
})
export class RouteMapService {
  private routeSubject = new BehaviorSubject<RouteInfo | null>(null);
  currentRoute$ = this.routeSubject.asObservable();

  private leafletMap: any = null;
  private routeLayer: any = null;

  setRoute(route: RouteInfo): void {
    this.routeSubject.next(route);
  }

  initMap(elementId: string): void {
    if (typeof window === 'undefined') return;
    import('leaflet').then(L => {
      this.leafletMap = L.map(elementId).setView([20.5937, 78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.leafletMap);
    });
  }

  renderRoute(route: RouteInfo): void {
    if (!this.leafletMap) return;
    import('leaflet').then(L => {
      if (this.routeLayer) {
        this.leafletMap.removeLayer(this.routeLayer);
      }
      const allPoints: Waypoint[] = [route.origin, ...route.waypoints, route.destination];
      const latLngs = allPoints.map(p => L.latLng(p.lat, p.lng));
      this.routeLayer = L.polyline(latLngs, { color: '#ef4444', weight: 4 }).addTo(this.leafletMap);
      allPoints.forEach((wp, i) => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">${i + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        L.marker([wp.lat, wp.lng], { icon }).addTo(this.leafletMap).bindPopup(wp.label);
      });
      this.leafletMap.fitBounds(this.routeLayer.getBounds(), { padding: [40, 40] });
    });
  }

  destroyMap(): void {
    if (this.leafletMap) {
      this.leafletMap.remove();
      this.leafletMap = null;
    }
  }
}
