import { Batch, GrowthStage, Product } from './types';

export const MOCK_BATCHES: Batch[] = [
  {
    id: 'b-101',
    speciesName: 'Pink Oyster',
    strain: 'Pleurotus djamor',
    startDate: '2023-10-15',
    growthStage: GrowthStage.FRUITING,
    notes: 'High humidity requirements. Growing rapidly.',
    readings: [],
    currentReading: { timestamp: new Date().toISOString(), temperature: 24.5, humidity: 88, co2: 650 }
  },
  {
    id: 'b-102',
    speciesName: 'Lion\'s Mane',
    strain: 'Hericium erinaceus',
    startDate: '2023-10-20',
    growthStage: GrowthStage.INCUBATION,
    notes: 'Colonizing well on hardwood sawdust.',
    readings: [],
    currentReading: { timestamp: new Date().toISOString(), temperature: 21.0, humidity: 60, co2: 1200 }
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    farmerId: 'f-1',
    name: 'Fresh Blue Oyster Mushrooms',
    description: 'Organically grown Blue Oyster mushrooms, harvested daily.',
    price: 499.00,
    stock: 50,
    category: 'Fresh',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'p-2',
    farmerId: 'f-1',
    name: 'Lion\'s Mane Grow Kit',
    description: 'Ready-to-fruit grow kit. Experience the joy of growing your own.',
    price: 899.00,
    stock: 20,
    category: 'Kit',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    rating: 4.5,
    reviews: 89
  },
  {
    id: 'p-3',
    farmerId: 'f-2',
    name: 'Dried Reishi Slices',
    description: 'Premium dried Reishi for tea and tinctures.',
    price: 1250.00,
    stock: 15,
    category: 'Dried',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    rating: 4.9,
    reviews: 45
  },
  {
    id: 'p-4',
    farmerId: 'f-2',
    name: 'Shiitake Spawn Plugs',
    description: 'Inoculate your own logs with these high-yield plugs.',
    price: 550.00,
    stock: 100,
    category: 'Spawn',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    rating: 4.2,
    reviews: 30
  }
];