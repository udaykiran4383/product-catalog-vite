import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import ProductCatalog from './components/ProductCatalog'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  return (
    <Provider store={store}>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <div className="flex-grow bg-white dark:bg-gray-900 transition-colors duration-200">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="container mx-auto px-4 py-8">
            <ProductCatalog />
          </main>
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default App

