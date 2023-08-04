import { postService } from '@/services/blog/posts'
import { RootState } from '@/store/store'
import { PostItemType, PostsStateType } from '@/types/blog/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Статьи блога
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: PostsStateType = {
  postItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  filter: {
    category: 'Все статьи',
    sort: 'new',
    query: '',
  },
  status: Status.Loading,
}

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostItemType[]>) => {
      state.postItems = action.payload
      state.status = Status.Success
    },
    setPostsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setPostsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setPostsCategory: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload
    },
    setPostsSort: (state, action: PayloadAction<string>) => {
      state.filter.sort = action.payload
    },
    setPostsQuery: (state, action: PayloadAction<string>) => {
      state.filter.query = action.payload
    },
    setPostsStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setPostsFilterDefault: state => {
      state.filter = {
        category: 'Все статьи',
        sort: 'new',
        query: '',
      }
    },
  },
})

/**
 * Action
 */
export const {
  setPosts,
  setPostsTotalItems,
  setPostsPage,
  setPostsCategory,
  setPostsSort,
  setPostsQuery,
  setPostsStatus,
} = posts.actions

export default posts.reducer

/**
 * Selector
 */
export const postsSelector = (state: RootState) => state.posts

/**
 * thunk
 * загрузка постов
 */
export const getPosts =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setPostsStatus(Status.Loading))
    try {
      const res = await postService.getPosts(
        getState().posts.filter,
        getState().posts.pagination
      )
      dispatch(setPosts(res.data))
      res.headers['x-total-count'] &&
        dispatch(setPostsTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setPostsStatus(Status.Error))
      console.log(err)
    }
  }

export const postsActions = { ...posts.actions, getPosts }
