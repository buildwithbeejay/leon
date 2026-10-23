export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number; // For map projection
  lng: number;
  heroImage: string;
  thumbnail: string;
  tagline: string;
  season: string;
  fluffRating: number;
  snackScore: number;
  favoriteSnack: string;
  elevation: string;
  diarySnippet: string;
  fullDiary: string;
  pacoTip: string;
  packingList: string[];
  coordinatesLabel: string;
}

export interface TravelStory {
  id: string;
  title: string;
  slug: string;
  location: string;
  country: string;
  flag: string;
  category: 'Mountain Treks' | 'Culinary Quests' | 'Culture & Temples' | 'Misadventures' | 'Travel Tips';
  date: string;
  readTime: string;
  image: string;
  summary: string;
  fullArticle: {
    lead: string;
    sections: {
      heading: string;
      content: string;
      quote?: string;
    }[];
    pacoDosAndDonts: {
      dos: string[];
      donts: string[];
    };
  };
}

export interface Product {
  id: string;
  name: string;
  priceUSD: number;
  category: 'Collectibles' | 'Gear' | 'Stationery' | 'Apparel';
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
  calendarPreviewMonths?: { month: string; title: string; image: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PostcardState {
  recipientName: string;
  senderName: string;
  message: string;
  photoUrl: string;
  photoTitle: string;
  stampType: 'machu_picchu' | 'paris' | 'kyoto' | 'amalfi';
  date: string;
}

export interface WardrobeOptions {
  hat: 'none' | 'chullo' | 'beret' | 'safari' | 'beanie' | 'straw';
  glasses: 'none' | 'aviators' | 'sunglasses' | 'glasses';
  accessory: 'none' | 'scarf' | 'poncho' | 'backpack' | 'camera' | 'baguette';
  background: 'alps' | 'machu' | 'kyoto' | 'amalfi' | 'paris';
}
