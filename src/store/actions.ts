import { commentsAdminActions } from './admin/blog/comments'
import { authActions } from './auth/auth'
import { commentsActions } from './blog/comments/comments'
import { postsActions } from './blog/posts/posts'
import { postActions } from './blog/post/post'
import { postsFavoritesActions } from './blog/favorites/postsFavorites'
import { eventsActions } from './club/events/events'
import { groupActions } from './club/group/group'
import { groupsActions } from './club/groups/groups'
import { messagesActions } from './club/messages/messages'
import { noteActions } from './club/note/note'
import { notesActions } from './club/notes/notes'
import { recommendationsActions } from './club/recommendations/recommendations'
import { roomsActions } from './club/rooms/rooms'
import { userActions } from './club/user/user'
import { usersActions } from './club/users/users'
import { navigationActions } from './navigation/navigation'
import { cartActions } from './shop/cart/cart'
import { productsFavoritesActions } from './shop/favorites/favorites'
import { orderActions } from './shop/order/order'
import { productActions } from './shop/product/product'
import { productsActions } from './shop/products/products'
import { compareActions } from './shop/compare/compare'
import { reviewsActions } from './shop/reviews/reviews'
import { setTheme } from './theme/theme'

export const actions = {
  ...navigationActions,
  ...authActions,
  ...productsFavoritesActions,
  ...productsActions,
  ...compareActions,
  ...reviewsActions,
  ...productActions,
  ...cartActions,
  ...orderActions,
  ...postsActions,
  ...postActions,
  ...postsFavoritesActions,
  ...commentsActions,
  ...usersActions,
  ...userActions,
  ...notesActions,
  ...noteActions,
  ...groupsActions,
  ...groupActions,
  ...messagesActions,
  ...roomsActions,
  ...eventsActions,
  ...recommendationsActions,
  ...commentsAdminActions,
  setTheme,
}
