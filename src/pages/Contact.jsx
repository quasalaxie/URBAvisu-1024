import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import SafeIcon from '../components/SafeIcon'
import { FiSend, FiCheck } from 'react-icons/fi'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {t('common.contact')}
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <SafeIcon icon={FiCheck} className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-green-800 mb-2">Message envoyé!</h3>
            <p className="text-green-700">
              Merci de nous avoir contactés. Nous vous répondrons dans les meilleurs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <SafeIcon icon={FiSend} className="mr-2" />
              Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Contact