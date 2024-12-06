import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { fetchProducts, selectProducts, selectStatus, selectError, selectSearchTerm, selectSortBy, selectSortOrder, selectCurrentPage, selectItemsPerPage } from '../store/productsSlice'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import SortControls from './SortControls'

const ProductCatalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectProducts)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const searchTerm = useSelector(selectSearchTerm)
  const sortBy = useSelector(selectSortBy)
  const sortOrder = useSelector(selectSortOrder)
  const currentPage = useSelector(selectCurrentPage)
  const itemsPerPage = useSelector(selectItemsPerPage)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        } else if (sortBy === 'rating') {
          return sortOrder === 'asc' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate
        }
        return 0
      })
    }

    return result
  }, [products, searchTerm, sortBy, sortOrder])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedProducts, currentPage, itemsPerPage])

  if (status === 'loading') {
    return <div className="text-center py-10 text-gray-800 dark:text-white">Loading...</div>
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <SortControls />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalItems={filteredAndSortedProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ProductCatalog

