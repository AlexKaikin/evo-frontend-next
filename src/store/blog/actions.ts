import { commentsActions } from './comments/comments'
import { postsFavoritesActions } from './favorites/postsFavorites'

export const blogActions = { ...commentsActions, ...postsFavoritesActions }
