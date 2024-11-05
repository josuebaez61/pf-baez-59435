import { Product } from '../../products/models';
import { User } from '../../users/models';

export interface Sale {
  id: string;
  userId: string;
  productId: string;
  user?: User;
  product?: Product;
}
