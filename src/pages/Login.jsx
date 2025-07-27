import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import SafeIcon from '../components/SafeIcon'
import { FiMail, FiLock, FiArrowRight, FiX } from 'react-icons/fi'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      if (error) throw error
      
      // Redirection vers la page d'accueil après connexion
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">{t('nav.login')}</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded flex items-center">
            <SafeIcon icon={FiX} className="mr-2" />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {t('auth.loginButton')}
            <SafeIcon icon={FiArrowRight} className="ml-2" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="text-red-600 hover:text-red-700">
              {t('nav.signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login