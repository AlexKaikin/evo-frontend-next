import { productService } from '@/services/shop/products'
import { RootState } from '@/store/store'
import {
  IFilterProducts,
  IProduct,
  ProductsStateType,
} from '@/types/shop/products'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

/**
 * Товары
 */

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: ProductsStateType = {
  productItems: [],
  pagination: {
    pagesCount: 0,
    totalItems: 0,
    limitItems: 8,
    currentPage: 1,
  },
  filter: {
    category: 'Все чаи',
    sort: 'new',
    q: '',
    price_gte: '',
    price_lte: '',
    ratings: '',
    manufacturer: '',
  },
  status: Status.Loading,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.productItems = action.payload
      state.status = Status.Success
    },
    setProductsTotalItems: (state, action: PayloadAction<string>) => {
      state.pagination.totalItems = +action.payload
      state.pagination.pagesCount = Math.ceil(
        +action.payload / initialState.pagination.limitItems
      )
    },
    setProductsPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setProductsCategory: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload
    },
    setProductsSort: (state, action: PayloadAction<string>) => {
      state.filter.sort = action.payload
    },
    setProductsQuery: (state, action: PayloadAction<string>) => {
      state.filter.q = action.payload
    },
    setProductsStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
    setProductsFilter: (state, action: PayloadAction<IFilterProducts>) => {
      state.filter = { ...action.payload }
    },
    setProductsFilterDefault: state => {
      state.filter = {
        category: 'Все чаи',
        sort: 'new',
        q: '',
        price_gte: '',
        price_lte: '',
        ratings: '',
        manufacturer: '',
      }
    },
  },
})

/**
 * Action
 */
export const {
  setProducts,
  setProductsTotalItems,
  setProductsPage,
  setProductsCategory,
  setProductsSort,
  setProductsQuery,
  setProductsStatus,
  setProductsFilter,
} = productsSlice.actions

export default productsSlice.reducer

/**
 * Selector
 */
export const productsSelector = (state: RootState) => state.products

/**
 * thunk
 * загрузка товаров
 */
// export const getProducts =
//   () => async (dispatch: Function, getState: Function) => {
//     dispatch(setProductsStatus(Status.Loading))
//     try {
//       const res = await productService.getAll(
//         getState().products.filter,
//         getState().products.pagination
//       )
//       dispatch(setProducts(res.data))
//       res.headers['x-total-count'] &&
//         dispatch(setProductsTotalItems(res.headers['x-total-count']))
//     } catch (err) {
//       dispatch(setProductsStatus(Status.Error))
//       console.log(err)
//     }
//   }

export const productsActions = { ...productsSlice.actions }