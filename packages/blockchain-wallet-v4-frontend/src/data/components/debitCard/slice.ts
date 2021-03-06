import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Remote } from '@core'

import { DebitCardState } from './types'

const initialState: DebitCardState = {
  cardCreationData: Remote.NotAsked,
  products: []
}

const debitCardSlice = createSlice({
  initialState,
  name: 'debitCard',
  reducers: {
    createCard: (state, action: PayloadAction<string>) => {},
    createCardFailure: (state, action: PayloadAction<string>) => {
      state.cardCreationData = Remote.Failure(action.payload)
    },
    createCardLoading: (state) => {
      state.cardCreationData = Remote.Loading
    },
    createCardSuccess: (state, action: PayloadAction<string>) => {
      state.cardCreationData = Remote.Success(action.payload)
    },
    getProducts: () => {},
    getProductsFailure: (state, action) => {
      state.products = action.payload
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload
    },
    resetCreateCardState: (state) => {
      state.cardCreationData = Remote.NotAsked
    }
  }
})

const { actions } = debitCardSlice
const debitCardReducer = debitCardSlice.reducer
export { actions, debitCardReducer }
