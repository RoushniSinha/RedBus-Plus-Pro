import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { environment } from 'src/environments/environment';

export interface UserReview {
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  route: string;
}

export interface InteractiveRoute {
  from: string;
  to: string;
  duration: string;
  highlights: string;
  imageUrl: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  fromoption: string = ''
  tooption: string = ''
  date: string = ''
  showDemoSections = environment.features.reviews;

  reviews: UserReview[] = environment.features.reviews ? [
    { author: 'Arjun Mehta', avatar: 'AM', rating: 5, comment: 'Smooth ride, punctual bus, and great seat comfort. Will book again!', route: 'Delhi → Jaipur' },
    { author: 'Sneha Patel', avatar: 'SP', rating: 5, comment: 'Best overnight sleeper experience I have had. Reached Goa totally refreshed.', route: 'Mumbai → Goa' },
    { author: 'Karthik Rao', avatar: 'KR', rating: 4, comment: 'Friendly staff, clean bus. The mountain roads were scenic and the ride was smooth.', route: 'Bangalore → Mysore' },
    { author: 'Deepa Iyer', avatar: 'DI', rating: 5, comment: 'RedBus Plus Pro is my go-to for all travel bookings. Excellent service every time!', route: 'Chennai → Pondicherry' },
    { author: 'Rohit Gupta', avatar: 'RG', rating: 4, comment: 'On-time departure, comfortable seats, and a great view of the Himalayan foothills.', route: 'Kolkata → Darjeeling' },
    { author: 'Preethi Nair', avatar: 'PN', rating: 5, comment: 'The live tracking feature gave me peace of mind. My family could see exactly where I was.', route: 'Bangalore → Mysore' },
    { author: 'Vivek Sharma', avatar: 'VS', rating: 4, comment: 'Amazing coastal views on this route. The bus had great air conditioning and charging ports.', route: 'Mumbai → Goa' },
    { author: 'Lakshmi Krishnan', avatar: 'LK', rating: 5, comment: 'Very professional service. The bus arrived early and the staff helped with luggage.', route: 'Delhi → Jaipur' },
    { author: 'Aditya Singh', avatar: 'AS', rating: 4, comment: 'Comfortable journey with Wi-Fi on board. Perfect for a business trip.', route: 'Chennai → Pondicherry' },
    { author: 'Nisha Reddy', avatar: 'NR', rating: 5, comment: 'Loved every minute of the Darjeeling trip. The bus was immaculate and the crew was warm.', route: 'Kolkata → Darjeeling' }
  ] : [];

  interactiveRoutes: InteractiveRoute[] = environment.features.routePlanning ? [
    {
      from: 'Delhi',
      to: 'Jaipur',
      duration: '5–6 hrs',
      highlights: 'Aravalli Hills · Amber Fort views · Sunrise over the Pink City',
      imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e43?w=600&q=80'
    },
    {
      from: 'Mumbai',
      to: 'Goa',
      duration: '8–10 hrs',
      highlights: 'Konkan Coastline · Western Ghats · Beach Arrival',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80'
    },
    {
      from: 'Bangalore',
      to: 'Mysore',
      duration: '3–4 hrs',
      highlights: 'Chamundi Hills · Brindavan Gardens · Mysore Palace',
      imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80'
    }
  ] : [];

  constructor(private router: Router, public dialog: MatDialog) { }
  fromEvent(option: string) {
    this.fromoption = option;
    console.log(this.fromoption)
  }
  toEvent(option: string) {
    this.tooption = option;
  }
  matchDate(event: any) {
    if (event.value) {
      const date = new Date(event.value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      this.date = `${year}-${month}-${day}`;
    } else {
      this.date = 'null';
    }
    console.log(this.date)
  }
  submit() {
    if (this.fromoption && this.tooption && this.date) {
      if (this.fromoption === 'Delhi' && this.tooption === 'Jaipur' || this.fromoption === 'Mumbai' && this.tooption === 'Goa' || this.fromoption === 'Bangalore' && this.tooption === 'Mysore' || this.fromoption === 'Kolkata' && this.tooption === 'Darjeeling' || this.fromoption === 'Chennai' && this.tooption === 'Pondicherry') {
        this.router.navigate(['/select-bus'],{
          queryParams:{
            departure:this.fromoption,
            arrival:this.tooption,
            date:this.date
          }
        });
      } else {
        const dialogRef = this.dialog.open(DialogComponent);

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    } else {
      alert("fill up the details!!!")
    }
  }
}
