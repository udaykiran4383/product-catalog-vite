import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, selectSearchTerm } from '../store/productsSlice'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">Product Catalog</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full sm:w-auto"
          />
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)

