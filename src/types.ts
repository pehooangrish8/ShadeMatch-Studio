export type SkinTone = 'Fair' | 'Light' | 'Medium' | 'Tan' | 'Deep' | 'Rich Deep';
export type Undertone = 'Cool' | 'Warm' | 'Neutral' | 'Olive' | 'Peach';
export type SkinType = 'Dry' | 'Combination' | 'Oily' | 'Normal' | 'Sensitive';
export type HairType = 'Straight' | 'Wavy' | 'Curly' | 'Coily';

export interface BeautyProfile {
  name: string;
  email: string;
  avatar: string;
  skinTone: SkinTone;
  undertone: Undertone;
  skinType: SkinType;
  hairType: HairType;
  hairConcerns: string[];
  makeupStyle: string;
  budget: 'Budget' | 'Mid-Range' | 'Luxury' | 'Ultra-Luxury';
  favoriteBrands: string[];
  beautyScore: number;
}

export type ProductCategory = 
  | 'Foundation'
  | 'Lipstick'
  | 'Concealer'
  | 'Mascara'
  | 'Blush'
  | 'Eyeshadow'
  | 'Perfume'
  | 'Haircare'
  | 'Skincare';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  suitableSkinType: SkinType[];
  suitableSkinTone?: SkinTone[];
  undertoneMatch?: Undertone[];
  shadeName?: string;
  shadeHex?: string;
  description: string;
  finish?: 'Matte' | 'Dewy' | 'Satin' | 'Radiant' | 'Natural';
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface FoundationShade {
  id: string;
  brand: string;
  productName: string;
  shadeCode: string;
  shadeName: string;
  hex: string;
  undertone: Undertone;
  skinToneCategory: SkinTone;
  finish: 'Matte' | 'Dewy' | 'Satin' | 'Radiant' | 'Natural';
  coverage: 'Light' | 'Medium' | 'Full' | 'Buildable';
  price: number;
  matchPercentage: number;
  image: string;
  notes: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'Natural' | 'Office' | 'Party' | 'Bridal' | 'Soft Glam';
  image: string;
  description: string;
  difficulty: 'Easy' | 'Intermediate' | 'Pro';
  durationMinutes: number;
  productsUsedIds: string[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    proTip?: string;
  }[];
  tags: string[];
  savedCount: number;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  bio: string;
}

export interface Appointment {
  id: string;
  serviceName: string;
  artistId: string;
  artistName: string;
  date: string;
  timeSlot: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: number;
  location: string;
  notes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}
