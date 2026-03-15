export interface IDimensionalRating {
  punctuality: number;
  cleanliness: number;
  amenities: number;
  driverBehavior: number;
  comfort: number;
}

export interface IReview {
  id?: string;
  busId: string;
  customerId: string;
  customerName: string;
  ratings: IDimensionalRating;
  averageScore: number;
  comment: string;
  timeDecayWeight: number;
  journeyDate: string;
  createdAt: string;
  helpfulVotes: number;
}
