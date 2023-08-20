import { cartActions } from './cart/cart'
import { compareActions } from './compare/compare'
import { productsFavoritesActions } from './favorites/favorites'
import { reviewsActions } from './reviews/reviews'

export const shopActions = {
  ...cartActions,
  ...compareActions,
  ...productsFavoritesActions,
  ...reviewsActions,
}