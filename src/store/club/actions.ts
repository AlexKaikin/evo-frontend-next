import { eventsActions } from './events/events'
import { groupActions } from './group/group'
import { groupsActions } from './groups/groups'
import { messagesActions } from './messages/messages'
import { noteActions } from './note/note'
import { notesActions } from './notes/notes'
import { recommendationsActions } from './recommendations/recommendations'
import { roomsActions } from './rooms/rooms'
import { userActions } from './user/user'
import { usersActions } from './users/users'

export const clubActions = {
  ...userActions,
  ...usersActions,
  ...roomsActions,
  ...notesActions,
  ...recommendationsActions,
  ...noteActions,
  ...messagesActions,
  ...groupsActions,
  ...groupActions,
  ...eventsActions,
}
