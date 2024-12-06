import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../store/productsSlice'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage }) => {
  const dispatch = useDispatch()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default React.memo(Pagination)

