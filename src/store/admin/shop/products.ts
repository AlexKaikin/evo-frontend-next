import { productAdminService } from '@/services/shop/products'
import {
  CreateProductType,
  ProductItemType,
  ProductsStateType,
} from '@/types/shop/products'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { setProduct } from '../../shop/product/product'
import { RootState } from '../../store'

/**
 * Товары в панеле администратора
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
    query: '',
    priceFrom: '',
    priceTo: '',
    ratings: [
      { id: 1, name: 'rating1', checked: false },
      { id: 2, name: 'rating2', checked: false },
      { id: 3, name: 'rating3', checked: false },
      { id: 4, name: 'rating4', checked: false },
      { id: 5, name: 'rating5', checked: false },
    ],
    manufacturer: '',
  },
  status: Status.Loading,
}

export const productsAdmin = createSlice({
  name: 'productsAdmin',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductItemType[]>) => {
      state.productItems = action.payload
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
  setProducts,
  setTotalItems,
  setCurrentPage,
  setCategoryActive,
  setSortActive,
  setQuery,
  setStatus,
} = productsAdmin.actions

export default productsAdmin.reducer

/**
 * Selector
 */
export const productsAdminSelector = (state: RootState) => state.productsAdmin

/**
 * thunk
 * загрузка товаров
 */
export const getProductsAdmin =
  () => async (dispatch: Function, getState: Function) => {
    dispatch(setStatus(Status.Loading))
    try {
      const res = await productAdminService.getProducts(
        getState().productsAdmin.filter,
        getState().productsAdmin.pagination
      )
      dispatch(setProducts(res.data))
      res.headers['x-total-count'] &&
        dispatch(setTotalItems(res.headers['x-total-count']))
    } catch (err) {
      dispatch(setStatus(Status.Error))
      console.log(err)
    }
  }

export const getProductAdmin = (id: number) => async (dispatch: Function) => {
  dispatch(setStatus(Status.Loading))
  try {
    const res = await productAdminService.getProduct(id)
    dispatch(setProduct(res.data))
  } catch (err) {
    dispatch(setStatus(Status.Error))
    console.log(err)
  }
}

/**
 * создать товар
 */
export const createProduct =
  (data: CreateProductType) => async (dispatch: Function) => {
    try {
      const res = await productAdminService.createProduct(data)
      dispatch(setProduct(res.data))
    } catch (err) {
      console.log(err)
    }
  }

/**
 * обновить товар
 */
export const updateProduct =
  (data: ProductItemType) => async (dispatch: Function) => {
    try {
      await productAdminService.updateProduct(data)
      dispatch(setProduct(data))
    } catch (err) {
      console.log(err)
    }
  }

/**
 * удалить товар
 */
export const deleteProduct = (id: number) => async (dispatch: Function) => {
  try {
    await productAdminService.deleteProduct(id)
  } catch (err) {
    console.log(err)
  }
}
