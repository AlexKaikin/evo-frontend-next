import { commentService } from '@/services/blog/comments'
import { IComment, CommentsStateType } from '@/types/blog/comments'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Комментарии к постам в панеле администратора
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: CommentsStateType = {
  commentItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  status: Status.Loading,
}

export const commentsAdmin = createSlice({
  name: 'commentsAdmin',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.commentItems = action.payload
      state.status = Status.Success
    },
    setCommentsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setCommentsCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setCommentsStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setUpdateComment: (state, action: PayloadAction<IComment>) => {
      const newItem = action.payload
      state.commentItems.splice(
        state.commentItems.findIndex(item => item.id === newItem.id),
        1,
        newItem
      )
    },
  },
})

/**
 * Action
 */
export const {
  setComments,
  setCommentsTotalItems,
  setCommentsCurrentPage,
  setCommentsStatus,
  setUpdateComment,
} = commentsAdmin.actions

export default commentsAdmin.reducer

/**
 * Selector
 */
export const commentsAdminSelector = (state: RootState) => state.commentsAdmin

/**
 * thunk
 */

export const getCommentsAdmin =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setCommentsStatus(Status.Loading))
    try {
      const res = await commentService.getAllForAdmin(
        getState().commentsAdmin.pagination
      )
      dispatch(setComments(res.data))
      res.headers['x-total-count'] &&
        dispatch(setCommentsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const updateComment =
  (value: IComment) => async (dispatch: Function) => {
    try {
      await commentService.updateComment(value)
      dispatch(setUpdateComment(value))
      return 'ok'
    } catch (err) {
      console.warn(err)
    }
  }

export const deleteComment =
  (post_id: string) => async (dispatch: Function) => {
    try {
      await commentService.deleteComment(post_id)
    } catch (err) {
      console.log(err)
    }
  }

export const commentsAdminActions = {
  ...commentsAdmin.actions,
  getCommentsAdmin,
  updateComment,
  deleteComment,
}
