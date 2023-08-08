import { productService } from '@/services/shop/products'
import { IProduct, ProductStateType } from '@/types/shop/products'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

const initialState: ProductStateType = {
  productItem: null,
  status: Status.Loading,
}

export const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.productItem = action.payload
      state.status = Status.Success
    },

    setProductStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },
  },
})

export const { setProduct, setProductStatus } = product.actions
export default product.reducer
export const productSelector = (state: RootState) => state.product

/**
 * thunk
 * загрузка товара
 */
// export const getProduct = (id: number) => async (dispatch: Function) => {
//   dispatch(setProductStatus(Status.Loading))
//   try {
//     const res = await productService.getProduct(id)
//     dispatch(setProduct(res.data))
//   } catch (err) {
//     dispatch(setProductStatus(Status.Error))
//     console.log(err)
//   }
// }

export const productActions = { ...product.actions }
