import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const Terms = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-black mb-8">
        Conditions générales d'utilisation
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">1. Dispositions générales</h2>
          <p className="mb-4">
            Les présentes conditions générales régissent l'utilisation de la plateforme URBAvisu, 
            exploitée par URBA visu Sàrl, une société de droit suisse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">2. Services</h2>
          <p className="mb-4">
            URBAvisu est une plateforme qui agrège et présente des données urbaines et cadastrales 
            suisses à des fins informatives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">3. Limitation de responsabilité</h2>
          <p className="mb-4">
            Nous déclinons toute responsabilité quant à l'exactitude, l'exhaustivité ou la 
            fiabilité des données présentées.
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-gray-500">
        Dernière mise à jour : 10 janvier 2025
      </p>
    </div>
  )
}

export default Terms