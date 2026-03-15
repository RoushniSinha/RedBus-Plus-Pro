import { Component, OnInit, signal } from '@angular/core';
import { EliteDataService } from '../../service/elite-data.service';
import { NotificationService } from '../../service/notification.service';
import { IRouteElite, IWaypoint } from '../../model/route-elite.interface';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements OnInit {
  readonly routes = signal<IRouteElite[]>([]);
  readonly selectedRoute = signal<IRouteElite | null>(null);
  readonly selectedWaypoint = signal<IWaypoint | null>(null);
  readonly loading = signal<boolean>(true);

  constructor(
    private dataService: EliteDataService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.dataService.getEliteRoutes();
      this.routes.set(data);
      if (data.length > 0) {
        this.selectedRoute.set(data[0]);
      }
    } catch {
      this.notificationService.error('Could not load routes. Showing cached data.');
    } finally {
      this.loading.set(false);
    }
  }

  selectRoute(route: IRouteElite): void {
    this.selectedRoute.set(route);
    this.selectedWaypoint.set(null);
  }

  selectWaypoint(waypoint: IWaypoint): void {
    this.selectedWaypoint.set(waypoint);
  }

  getTrafficLabel(index: number): string {
    if (index < 0.4) return 'Low';
    if (index < 0.7) return 'Moderate';
    return 'High';
  }

  getTrafficClass(index: number): string {
    if (index < 0.4) return 'traffic-low';
    if (index < 0.7) return 'traffic-moderate';
    return 'traffic-high';
  }

  formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  trackByRouteId(_index: number, route: IRouteElite): string {
    return route.id ?? _index.toString();
  }

  trackByWaypointName(_index: number, wp: IWaypoint): string {
    return wp.name;
  }
}
