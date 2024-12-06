import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortBy, setSortOrder, selectSortBy, selectSortOrder } from '../store/productsSlice'

const SortControls: React.FC = () => {
  const dispatch = useDispatch()
  const sortBy = useSelector(selectSortBy)
  const sortOrder = useSelector(selectSortOrder)

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as 'price' | 'rating' | null))
  }

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <div className="mb-2 sm:mb-0">
        <label htmlFor="sortBy" className="mr-2 text-gray-700 dark:text-gray-300">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy || ''}
          onChange={handleSortByChange}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      {sortBy && (
        <div>
          <label htmlFor="sortOrder" className="mr-2 text-gray-700 dark:text-gray-300">
            Order:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
    </div>
  )
}

export default React.memo(SortControls)

