import { postService } from '@/services/blog/posts'
import { PostItemType, PostStateType } from '@/types/blog/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

/**
 * Статья
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: PostStateType = {
  postItem: null,
  status: Status.Loading,
}

export const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostItemType>) => {
      state.postItem = action.payload
      state.status = Status.Success
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

/**
 * Action
 */
export const { setPost, setStatus } = post.actions

export default post.reducer

/**
 * Selector
 */
export const postSelector = (state: RootState) => state.post

/**
 * thunk
 * загрузка товара
 */
export const getPost = (id: number) => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading))
  try {
    const res = await postService.getPost(id)
    dispatch(setPost(res.data))
  } catch (err) {
    dispatch(setStatus(Status.Error))
    console.log(err)
  }
}

export const postActions = { ...post.actions, getPost }
