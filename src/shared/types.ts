// src/shared/types.ts

export interface RecurringDetails {
  frequency: 'weekly' | 'monthly' | 'custom';
  interval: number; // e.g., every 2 weeks, every 3 months
  endType: 'never' | 'after' | 'until';
  endAfter?: number; // number of occurrences
  endDate?: string; // end date
  weekDays?: string[]; // for weekly: ['monday', 'wednesday']
  monthlyType?: 'date' | 'day'; // monthly on same date (15th) or same day (2nd Tuesday)
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  recurring: boolean;
  recurringDetails?: RecurringDetails;
  photoURLs: string[];
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  recurring: boolean;
  recurringDetails?: RecurringDetails;
  photoURLs: string[];
}
