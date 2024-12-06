import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index.ts'
import axios from 'axios'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchTerm: string
  sortBy: 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
  currentPage: number
  itemsPerPage: number
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  sortBy: null,
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 8,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products')
  return response.data
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.currentPage = 1 
    },
    setSortBy: (state, action: PayloadAction<'price' | 'rating' | null>) => {
      state.sortBy = action.payload
      state.currentPage = 1 
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export const { setSearchTerm, setSortBy, setSortOrder, setCurrentPage } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.items
export const selectStatus = (state: RootState) => state.products.status
export const selectError = (state: RootState) => state.products.error
export const selectSearchTerm = (state: RootState) => state.products.searchTerm
export const selectSortBy = (state: RootState) => state.products.sortBy
export const selectSortOrder = (state: RootState) => state.products.sortOrder
export const selectCurrentPage = (state: RootState) => state.products.currentPage
export const selectItemsPerPage = (state: RootState) => state.products.itemsPerPage

export default productsSlice.reducer

