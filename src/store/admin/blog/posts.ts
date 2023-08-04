import { postAdminService } from '@/services/blog/posts'
import {
  NewPostItemType,
  PostItemType,
  PostsStateType,
} from '@/types/blog/posts'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { setPost } from '../../blog/post/post'
import { RootState } from '../../store'

/**
 * Статьи блога в панеле администратора
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

export const postsAdmin = createSlice({
  name: 'postsAdmin',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostItemType[]>) => {
      state.postItems = action.payload
      state.status = Status.Success
    },
    setTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setCategoryActive: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload
    },
    setSortActive: (state, action: PayloadAction<string>) => {
      state.filter.sort = action.payload
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.filter.query = action.payload
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

/**
 * Action
 */
export const {
  setPosts,
  setTotalItems,
  setCurrentPage,
  setCategoryActive,
  setSortActive,
  setQuery,
  setStatus,
} = postsAdmin.actions

export default postsAdmin.reducer

/**
 * Selector
 */
export const postsAdminSelector = (state: RootState) => state.postsAdmin

/**
 * thunk
 * загрузка постов
 */
export const getPostsAdmin =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await postAdminService.getPosts(
        getState().postsAdmin.filter,
        getState().postsAdmin.pagination
      )
      dispatch(setPosts(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setStatus(Status.Error))
      console.log(err)
    }
  }

export const getPostAdmin = (id: number) => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading))
  try {
    const res = await postAdminService.getPost(id)
    dispatch(setPost(res.data))
  } catch (err) {
    dispatch(setStatus(Status.Error))
    console.log(err)
  }
}

/**
 * создать запись
 */
export const createPost =
  (data: NewPostItemType) => async (dispatch: Function) => {
    try {
      const res = await postAdminService.createPost(data)
      dispatch(setPost(res.data))
    } catch (err) {
      console.log(err)
    }
  }

/**
 * обновить запись
 */
export const updatePost =
  (data: PostItemType) => async (dispatch: Function) => {
    try {
      await postAdminService.updatePost(data)
      dispatch(setPost(data))
    } catch (err) {
      console.log(err)
    }
  }

/**
 * удалить запись
 */
export const deletePost = (id: number) => async (dispatch: Function) => {
  try {
    await postAdminService.deletePost(id)
  } catch (err) {
    console.log(err)
  }
}
