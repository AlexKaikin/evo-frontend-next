import { authActions } from './auth/auth'
import { blogActions } from './blog/actions'
import { clubActions } from './club/actions'
import { navigationActions } from './navigation/navigation'
import { shopActions } from './shop/actions'
import { setTheme } from './theme/theme'

export const actions = {
  ...navigationActions,
  ...authActions,
  ...clubActions,
  ...blogActions,
  ...shopActions,
  setTheme,
}
