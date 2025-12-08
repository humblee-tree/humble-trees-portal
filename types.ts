export enum GrowthStage {
  INOCULATION = 'Inoculation',
  INCUBATION = 'Incubation',
  FRUITING = 'Fruiting',
  HARVEST = 'Harvest',
}

export interface SensorReading {
  timestamp: string;
  temperature: number; // Celsius
  humidity: number; // Percentage
  co2: number; // PPM
}

export interface Batch {
  id: string;
  speciesName: string;
  strain: string;
  startDate: string;
  growthStage: GrowthStage;
  notes: string;
  readings: SensorReading[]; // History of readings
  currentReading: SensorReading;
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'Fresh' | 'Dried' | 'Spawn' | 'Kit';
  imageUrl: string;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  customerName: string;
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
  items: { productId: string; quantity: number }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'cultivation' | 'marketplace' | 'farmer-admin' | 'ai-advisor';

export type UserRole = 'farmer' | 'customer';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
}