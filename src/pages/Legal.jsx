import React from 'react'

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-black mb-8">
        Mentions légales
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Informations légales</h2>
          <p className="mb-4">
            URBAvisu est exploité par URBA visu Sàrl, société à responsabilité limitée de droit suisse.
          </p>
          <ul className="mb-4 space-y-1">
            <li><strong>Siège social :</strong> Route de la Capite 104, 1223 Cologny, Suisse</li>
            <li><strong>Capital social :</strong> CHF 20'000</li>
            <li><strong>Inscription :</strong> Registre du commerce du canton de Genève</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Propriété intellectuelle</h2>
          <p className="mb-4">
            L'ensemble des éléments constituant le site URBAvisu est la propriété exclusive 
            d'URBA visu Sàrl ou fait l'objet d'une autorisation d'utilisation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit suisse. En cas de litige, 
            les tribunaux du canton de Genève sont seuls compétents.
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-gray-500">
        Dernière mise à jour : 10 janvier 2025
      </p>
    </div>
  )
}

export default Legal