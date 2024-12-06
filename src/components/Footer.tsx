import React from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Udaykiran Yennampelly</h2>
          <p className="text-gray-600 mb-2">B.Tech, IIT Bombay</p>
          <p className="text-gray-600 mb-2">Manager, Abhyuday web manager IIT Bombay</p>
          <p className="text-gray-600 mb-4">Contact: +91 9381406475</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://www.linkedin.com/in/uday-yennampelly-700969252/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/udaykiran4383"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaGithub size={24} />
            </a>
          </div>
          <p className="text-gray-600 italic">
            Looking forward to the opportunity of an interview. Thank you for considering my application!
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

