import React from 'react'
import { Product } from '../store/productsSlice'
import { StarIcon } from '@heroicons/react/20/solid'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain p-4 bg-white" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate" title={product.title}>
          {product.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2 font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2" title={product.description}>
          {product.description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Category: {product.category}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating.rate)
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  )
})

export default ProductCard

