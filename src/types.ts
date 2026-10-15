export type ProductCategory = 'all' | 'vegetables' | 'fruits' | 'nuts' | 'natural-foods';

export interface NutritionFact {
  calories: string;
  protein: string;
  carbs: string;
  fiber: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'nuts' | 'natural-foods';
  categoryLabel: string;
  price: number; // In Bangladeshi Taka (৳)
  originalPrice?: number;
  discountBadge?: string;
  unit: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  benefits: string[];
  image: string;
  fallbackImage: string;
  badge?: string;
  inStock: boolean;
  origin: string;
  nutrition: NutritionFact;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  orderNotes: string;
  paymentMethod: 'cod' | 'bkash';
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  formData: CheckoutFormData;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}
