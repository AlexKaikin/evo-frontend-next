import { commentService } from '@/services/blog/comments'
import {
  IComment,
  CommentsStateType,
  ICreateComment,
} from '@/types/blog/comments'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Комментарии к постам в блоге
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

export const comments = createSlice({
  name: 'comments',
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
} = comments.actions

export default comments.reducer

/**
 * Selector
 */
export const commentsSelector = (state: RootState) => state.comments

/**
 * thunk
 */
export const getComments = (post_id: string) => async (dispatch: Function) => {
  dispatch(setCommentsStatus(Status.Loading))
  try {
    const res = await commentService.getComments(post_id)
    dispatch(setComments(res.data))
    res.headers['x-total-count'] &&
      dispatch(setCommentsTotalItems(res.headers['x-total-count']))
  } catch (err) {
    console.warn(err)
  }
}

export const getCommentsProfile =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setCommentsStatus(Status.Loading))
    try {
      const res = await commentService.getAllForAccount(getState().pagination)
      dispatch(setComments(res.data))
      res.headers['x-total-count'] &&
        dispatch(setCommentsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      console.warn(err)
    }
  }

export const createComment =
  (values: ICreateComment) =>
  async (dispatch: Function, getState: Function) => {
    try {
      await commentService.createComment(values)
      return 'ok'
    } catch (err) {
      console.log(err)
    }
  }

export const commentsActions = {
  ...comments.actions,
  getComments,
  getCommentsProfile,
  createComment,
}
