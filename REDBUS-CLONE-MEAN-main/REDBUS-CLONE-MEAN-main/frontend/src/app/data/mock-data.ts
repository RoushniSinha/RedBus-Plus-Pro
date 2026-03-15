import { ITravelStory } from '../model/travel-story.interface';
import { IReview } from '../model/review.interface';
import { IRouteElite } from '../model/route-elite.interface';

// ─── Travel Stories ──────────────────────────────────────────────────────────

export const MOCK_TRAVEL_STORIES: ITravelStory[] = [
  {
    id: 'story-001',
    authorId: 'user-01',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    title: 'A Weekend Escape to the Pink City',
    content: {
      intro: 'Jaipur has always held a special place in my heart. This time I took the overnight RedBus from Delhi and arrived just as the sun was painting the Hawa Mahal in gold.',
      body: 'The bus ride itself was surprisingly comfortable — reclining seats, soft blankets, and a playlist of Rajasthani folk songs playing at just the right volume. I spent the first hour gazing out of the window as the city lights of Delhi slowly gave way to a sea of stars above the highway.',
      conclusion: 'If you ever get the chance to visit Jaipur, take the overnight bus. You arrive refreshed, the markets are just opening, and the whole city smells of marigolds.'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&auto=format&fit=crop'
    ],
    tags: ['jaipur', 'rajasthan', 'overnight-bus', 'heritage'],
    likes: 142,
    moderationStatus: 'approved',
    createdAt: '2025-11-10T06:30:00Z',
    updatedAt: '2025-11-10T06:30:00Z'
  },
  {
    id: 'story-002',
    authorId: 'user-02',
    authorName: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    title: 'Goa on a Budget: Mumbai to Panaji by Bus',
    content: {
      intro: 'Everyone told me to fly. I\'m glad I didn\'t. The Konkan coastline seen from a bus window is one of India\'s underrated travel treasures.',
      body: 'The journey takes roughly 14 hours, but the coastal highway cuts through palm groves, tiny fishing villages, and stretches of beach that no airplane will ever show you. I packed a thermos of masala chai and a paperback and settled in for what became one of my favourite travel memories.',
      conclusion: 'Total cost: ₹800. Total experience: priceless. RedBus sleeper coaches are seriously comfortable for long hauls.'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=800&auto=format&fit=crop'
    ],
    tags: ['goa', 'mumbai', 'budget-travel', 'coastal'],
    likes: 218,
    moderationStatus: 'approved',
    createdAt: '2025-12-02T09:00:00Z',
    updatedAt: '2025-12-02T09:00:00Z'
  },
  {
    id: 'story-003',
    authorId: 'user-03',
    authorName: 'Lakshmi Venkat',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
    title: 'Mysore Palace Under the Stars',
    content: {
      intro: 'A spontaneous Saturday decision took me from Bangalore to Mysore on the 6 PM express bus. By 9 PM I was standing in front of the illuminated palace.',
      body: 'On Sundays, Mysore Palace is lit up with nearly 100,000 light bulbs. The sight is overwhelming in the best possible way. The bus journey itself took exactly 3 hours, the driver was calm and professional, and I got a window seat with a panoramic view of the Chamundi Hills at dusk.',
      conclusion: 'Mysore deserves more than a day trip, but even a night visit leaves you richer. Book the last bus back — it fills up fast!'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626015365107-338e65d3d5ab?w=800&auto=format&fit=crop'
    ],
    tags: ['mysore', 'karnataka', 'palace', 'nighttrip'],
    likes: 95,
    moderationStatus: 'approved',
    createdAt: '2026-01-15T18:45:00Z',
    updatedAt: '2026-01-15T18:45:00Z'
  },
  {
    id: 'story-004',
    authorId: 'user-04',
    authorName: 'Rahul Das',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    title: 'Darjeeling: Where Tea Meets the Clouds',
    content: {
      intro: 'Kolkata in July is suffocating. Darjeeling in July is magic. I booked a night bus on a whim and it was the best decision I made all year.',
      body: 'The mountain roads after Siliguri require a skilled driver, and ours was exceptional — calm, steady, and generous with safety announcements. The mist rolling over the tea gardens just after dawn made every passenger fall silent. Someone at the back quietly said "SubhanAllah" and nobody laughed.',
      conclusion: 'Darjeeling teaches you to slow down. Start the lesson on the bus. Let the journey be part of the destination.'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop'
    ],
    tags: ['darjeeling', 'westbengal', 'mountains', 'teagarden'],
    likes: 177,
    moderationStatus: 'approved',
    createdAt: '2026-02-01T04:00:00Z',
    updatedAt: '2026-02-01T04:00:00Z'
  },
  {
    id: 'story-005',
    authorId: 'user-05',
    authorName: 'Meena Iyer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
    title: 'Pondicherry: A French Quarter, an Indian Soul',
    content: {
      intro: 'Chennai to Pondicherry is a 3-hour coastal ride that I\'ve done at least six times now. Every trip reveals something new about the Bay of Bengal.',
      body: 'The white-and-yellow French colonial buildings of Pondicherry\'s "White Town" are best discovered on foot at 7 AM, before the tourists arrive. I stepped off the bus near the promenade, watched fishermen haul in their catch, ate a dosa at a street-side stall, and felt genuinely happy in a way only travel can produce.',
      conclusion: 'The bus from Chennai is affordable, frequent, and reliable. Pack light, wear linen, and let Pondy work its charm.'
    },
    mediaUrls: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601000938259-b5b9e2e78e17?w=800&auto=format&fit=crop'
    ],
    tags: ['pondicherry', 'tamilnadu', 'french-quarter', 'coastal'],
    likes: 134,
    moderationStatus: 'approved',
    createdAt: '2026-02-20T07:15:00Z',
    updatedAt: '2026-02-20T07:15:00Z'
  }
];

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const MOCK_REVIEWS: IReview[] = [
  {
    id: 'review-001',
    busId: 'bus-101',
    customerId: 'user-01',
    customerName: 'Priya Sharma',
    ratings: { punctuality: 5, cleanliness: 4, amenities: 4, driverBehavior: 5, comfort: 4 },
    averageScore: 4.4,
    comment: 'Arrived 10 minutes early! The bus was spotless and the blankets were freshly laundered. Highly recommend.',
    timeDecayWeight: 0.95,
    journeyDate: '2025-11-09',
    createdAt: '2025-11-10T08:00:00Z',
    helpfulVotes: 23
  },
  {
    id: 'review-002',
    busId: 'bus-102',
    customerId: 'user-02',
    customerName: 'Arjun Mehta',
    ratings: { punctuality: 3, cleanliness: 4, amenities: 5, driverBehavior: 4, comfort: 5 },
    averageScore: 4.2,
    comment: 'Left 20 minutes late from Mumbai but the ride itself was excellent. Charging ports at every seat is a game-changer.',
    timeDecayWeight: 0.93,
    journeyDate: '2025-12-01',
    createdAt: '2025-12-02T10:30:00Z',
    helpfulVotes: 17
  },
  {
    id: 'review-003',
    busId: 'bus-103',
    customerId: 'user-03',
    customerName: 'Lakshmi Venkat',
    ratings: { punctuality: 5, cleanliness: 5, amenities: 3, driverBehavior: 5, comfort: 4 },
    averageScore: 4.4,
    comment: 'Super on time. Driver was cautious on the mountain stretch. Would have rated amenities higher if there was Wi-Fi.',
    timeDecayWeight: 0.90,
    journeyDate: '2026-01-14',
    createdAt: '2026-01-15T20:00:00Z',
    helpfulVotes: 12
  },
  {
    id: 'review-004',
    busId: 'bus-101',
    customerId: 'user-06',
    customerName: 'Rohan Kapoor',
    ratings: { punctuality: 4, cleanliness: 3, amenities: 3, driverBehavior: 4, comfort: 3 },
    averageScore: 3.4,
    comment: 'Average experience. The AC was too cold and the seat cushion was worn out. Not bad for the price though.',
    timeDecayWeight: 0.85,
    journeyDate: '2025-10-20',
    createdAt: '2025-10-21T09:00:00Z',
    helpfulVotes: 5
  },
  {
    id: 'review-005',
    busId: 'bus-104',
    customerId: 'user-07',
    customerName: 'Sunita Patel',
    ratings: { punctuality: 5, cleanliness: 5, amenities: 5, driverBehavior: 5, comfort: 5 },
    averageScore: 5.0,
    comment: 'Absolutely perfect journey. This is how bus travel should always be. Worth every rupee.',
    timeDecayWeight: 0.99,
    journeyDate: '2026-03-01',
    createdAt: '2026-03-02T07:45:00Z',
    helpfulVotes: 41
  },
  {
    id: 'review-006',
    busId: 'bus-102',
    customerId: 'user-08',
    customerName: 'Vikram Nair',
    ratings: { punctuality: 2, cleanliness: 3, amenities: 3, driverBehavior: 3, comfort: 3 },
    averageScore: 2.8,
    comment: 'Departed an hour late with no communication. The bus smelled of diesel inside. Staff were polite but unhelpful.',
    timeDecayWeight: 0.78,
    journeyDate: '2025-09-15',
    createdAt: '2025-09-16T11:00:00Z',
    helpfulVotes: 31
  },
  {
    id: 'review-007',
    busId: 'bus-103',
    customerId: 'user-09',
    customerName: 'Anjali Singh',
    ratings: { punctuality: 4, cleanliness: 4, amenities: 4, driverBehavior: 4, comfort: 4 },
    averageScore: 4.0,
    comment: 'Consistent 4-star experience. Reliable, clean, on time. Nothing extraordinary, nothing bad.',
    timeDecayWeight: 0.88,
    journeyDate: '2025-12-28',
    createdAt: '2025-12-29T06:20:00Z',
    helpfulVotes: 9
  },
  {
    id: 'review-008',
    busId: 'bus-104',
    customerId: 'user-10',
    customerName: 'Deepak Rao',
    ratings: { punctuality: 5, cleanliness: 4, amenities: 4, driverBehavior: 5, comfort: 4 },
    averageScore: 4.4,
    comment: 'Driver was professional and made good time without being reckless. The reading light worked perfectly.',
    timeDecayWeight: 0.97,
    journeyDate: '2026-02-14',
    createdAt: '2026-02-15T08:30:00Z',
    helpfulVotes: 14
  },
  {
    id: 'review-009',
    busId: 'bus-101',
    customerId: 'user-04',
    customerName: 'Rahul Das',
    ratings: { punctuality: 3, cleanliness: 5, amenities: 4, driverBehavior: 3, comfort: 4 },
    averageScore: 3.8,
    comment: 'The bus itself was immaculate, honestly the cleanest I\'ve seen. Driver speed was a bit erratic on the highway.',
    timeDecayWeight: 0.91,
    journeyDate: '2026-01-31',
    createdAt: '2026-02-01T05:00:00Z',
    helpfulVotes: 7
  },
  {
    id: 'review-010',
    busId: 'bus-105',
    customerId: 'user-05',
    customerName: 'Meena Iyer',
    ratings: { punctuality: 5, cleanliness: 5, amenities: 4, driverBehavior: 5, comfort: 5 },
    averageScore: 4.8,
    comment: 'Best bus I\'ve taken in years. Smooth coastal highway, sunrise views, and an on-time arrival. Booked again already.',
    timeDecayWeight: 0.98,
    journeyDate: '2026-02-19',
    createdAt: '2026-02-20T08:00:00Z',
    helpfulVotes: 28
  }
];

// ─── Routes ──────────────────────────────────────────────────────────────────

export const MOCK_ROUTES: IRouteElite[] = [
  {
    id: 'elite-route-001',
    origin: 'Delhi',
    destination: 'Jaipur',
    waypoints: [
      {
        name: 'Gurgaon Toll Plaza',
        position: { lat: 28.4595, lng: 77.0266, label: 'Gurgaon Toll' },
        type: 'landmark',
        estimatedArrival: '00:45'
      },
      {
        name: 'Dharuhera Rest Stop',
        position: { lat: 28.2034, lng: 76.7858, label: 'Dharuhera' },
        type: 'rest-stop',
        estimatedArrival: '01:30'
      },
      {
        name: 'Shahjahanpur Dhaba',
        position: { lat: 27.8978, lng: 76.5103, label: 'Shahjahanpur' },
        type: 'rest-stop',
        estimatedArrival: '02:45'
      },
      {
        name: 'Behror',
        position: { lat: 27.8916, lng: 76.2871, label: 'Behror' },
        type: 'city',
        estimatedArrival: '03:00'
      },
      {
        name: 'Kotputli',
        position: { lat: 27.7082, lng: 75.8497, label: 'Kotputli' },
        type: 'city',
        estimatedArrival: '03:45'
      }
    ],
    totalDistance: 281,
    estimatedDuration: 300,
    trafficIndex: 0.62,
    polyline: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.4595, lng: 77.0266 },
      { lat: 28.2034, lng: 76.7858 },
      { lat: 27.8978, lng: 76.5103 },
      { lat: 27.8916, lng: 76.2871 },
      { lat: 27.7082, lng: 75.8497 },
      { lat: 26.9124, lng: 75.7873 }
    ]
  },
  {
    id: 'elite-route-002',
    origin: 'Mumbai',
    destination: 'Goa',
    waypoints: [
      {
        name: 'Pune Bypass',
        position: { lat: 18.5204, lng: 73.8567, label: 'Pune' },
        type: 'city',
        estimatedArrival: '02:00'
      },
      {
        name: 'Satara Food Court',
        position: { lat: 17.6805, lng: 74.0183, label: 'Satara' },
        type: 'rest-stop',
        estimatedArrival: '03:30'
      },
      {
        name: 'Kolhapur Bus Stand',
        position: { lat: 16.7050, lng: 74.2433, label: 'Kolhapur' },
        type: 'city',
        estimatedArrival: '05:00'
      },
      {
        name: 'Sawantwadi',
        position: { lat: 15.9029, lng: 73.8193, label: 'Sawantwadi' },
        type: 'rest-stop',
        estimatedArrival: '07:00'
      },
      {
        name: 'Kankavli Rest Area',
        position: { lat: 16.1256, lng: 73.7051, label: 'Kankavli' },
        type: 'rest-stop',
        estimatedArrival: '06:00'
      }
    ],
    totalDistance: 587,
    estimatedDuration: 840,
    trafficIndex: 0.44,
    polyline: [
      { lat: 19.0760, lng: 72.8777 },
      { lat: 18.5204, lng: 73.8567 },
      { lat: 17.6805, lng: 74.0183 },
      { lat: 16.7050, lng: 74.2433 },
      { lat: 16.1256, lng: 73.7051 },
      { lat: 15.9029, lng: 73.8193 },
      { lat: 15.4909, lng: 73.8278 }
    ]
  },
  {
    id: 'elite-route-003',
    origin: 'Bangalore',
    destination: 'Mysore',
    waypoints: [
      {
        name: 'Electronic City Flyover',
        position: { lat: 12.8399, lng: 77.6770, label: 'Electronic City' },
        type: 'landmark',
        estimatedArrival: '00:20'
      },
      {
        name: 'Ramanagara Silk Town',
        position: { lat: 12.7137, lng: 77.2808, label: 'Ramanagara' },
        type: 'city',
        estimatedArrival: '01:00'
      },
      {
        name: 'Maddur Vade Stop',
        position: { lat: 12.5847, lng: 77.0424, label: 'Maddur' },
        type: 'rest-stop',
        estimatedArrival: '01:30'
      },
      {
        name: 'Mandya Sugar Belt',
        position: { lat: 12.5218, lng: 76.8951, label: 'Mandya' },
        type: 'city',
        estimatedArrival: '01:50'
      }
    ],
    totalDistance: 150,
    estimatedDuration: 180,
    trafficIndex: 0.35,
    polyline: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.8399, lng: 77.6770 },
      { lat: 12.7137, lng: 77.2808 },
      { lat: 12.5847, lng: 77.0424 },
      { lat: 12.5218, lng: 76.8951 },
      { lat: 12.2958, lng: 76.6394 }
    ]
  }
];
