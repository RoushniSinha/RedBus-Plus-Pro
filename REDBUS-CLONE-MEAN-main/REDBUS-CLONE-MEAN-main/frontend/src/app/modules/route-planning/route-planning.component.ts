import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteMapService, RouteInfo } from './route-map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-planning',
  templateUrl: './route-planning.component.html',
  styleUrls: ['./route-planning.component.css']
})
export class RoutePlanningComponent implements OnInit, OnDestroy {
  currentRoute$: Observable<RouteInfo | null>;

  readonly predefinedRoutes: RouteInfo[] = [
    {
      origin: { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      destination: { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      waypoints: [{ lat: 27.5530, lng: 76.6346, label: 'Alwar' }],
      distanceKm: 282,
      durationMin: 300
    },
    {
      origin: { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
      destination: { lat: 15.2993, lng: 74.1240, label: 'Goa' },
      waypoints: [{ lat: 17.3850, lng: 76.8250, label: 'Kolhapur' }],
      distanceKm: 597,
      durationMin: 660
    },
    {
      origin: { lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
      destination: { lat: 12.2958, lng: 76.6394, label: 'Mysore' },
      waypoints: [],
      distanceKm: 143,
      durationMin: 180
    }
  ];

  selectedRouteIndex = 0;

  constructor(private routeMapService: RouteMapService) {
    this.currentRoute$ = this.routeMapService.currentRoute$;
  }

  ngOnInit(): void {
    this.routeMapService.initMap('route-map');
    this.selectRoute(0);
  }

  ngOnDestroy(): void {
    this.routeMapService.destroyMap();
  }

  selectRoute(index: number): void {
    this.selectedRouteIndex = index;
    const route = this.predefinedRoutes[index];
    this.routeMapService.setRoute(route);
    this.routeMapService.renderRoute(route);
  }

  formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  getWaypointLabels(waypoints: { label: string }[]): string {
    return waypoints.map(w => w.label).join(', ');
  }
}
