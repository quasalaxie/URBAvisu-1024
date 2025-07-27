import React, { createContext, useContext, useState } from 'react'

const translations = {
  FR: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.search': 'Recherche',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.logout': 'Déconnexion',
    'nav.profile': 'Mon profil',
    'nav.admin': 'Administration',
    
    // Home
    'home.title': 'URBAvisu',
    'home.subtitle': 'Votre outil de visualisation urbaine pour la Suisse',
    'home.description': 'Analysez les données urbaines et territoriales avec précision. Obtenez des rapports détaillés sur les parcelles et zones d\'intérêt.',
    'home.getStarted': 'Commencer',
    'home.startSearch': 'Commencer une recherche',
    
    // Features
    'features.title1': 'Données cadastrales précises',
    'features.desc1': 'Accédez aux informations officielles des registres fonciers suisses',
    'features.title2': 'Rapports personnalisés',
    'features.desc2': 'Générez des rapports détaillés selon vos besoins spécifiques',
    'features.title3': 'Interface intuitive',
    'features.desc3': 'Navigation simple et visualisation claire des données complexes',
    
    // Auth
    'auth.email': 'Adresse e-mail',
    'auth.password': 'Mot de passe',
    'auth.firstName': 'Prénom',
    'auth.lastName': 'Nom',
    'auth.company': 'Entreprise',
    'auth.address': 'Adresse professionnelle',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.loginButton': 'Se connecter',
    'auth.signupButton': 'S\'inscrire',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    
    // Common
    'common.contact': 'Contact',
    'common.terms': 'Conditions',
    'common.legal': 'Mentions légales'
  },
  
  DE: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.search': 'Suche',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.logout': 'Abmelden',
    'nav.profile': 'Mein Profil',
    'nav.admin': 'Administration',
    
    // Home
    'home.title': 'URBAvisu',
    'home.subtitle': 'Ihr Visualisierungstool für Schweizer Städte',
    'home.description': 'Analysieren Sie urbane und territoriale Daten mit Präzision. Erhalten Sie detaillierte Berichte über Grundstücke und Interessengebiete.',
    'home.getStarted': 'Loslegen',
    'home.startSearch': 'Suche starten',
    
    // Features
    'features.title1': 'Präzise Katasterdaten',
    'features.desc1': 'Zugriff auf offizielle Informationen aus den Schweizer Grundbüchern',
    'features.title2': 'Individualisierte Berichte',
    'features.desc2': 'Erstellen Sie detaillierte Berichte nach Ihren spezifischen Anforderungen',
    'features.title3': 'Intuitive Oberfläche',
    'features.desc3': 'Einfache Navigation und klare Visualisierung komplexer Daten',
    
    // Auth
    'auth.email': 'E-Mail-Adresse',
    'auth.password': 'Passwort',
    'auth.firstName': 'Vorname',
    'auth.lastName': 'Nachname',
    'auth.company': 'Unternehmen',
    'auth.address': 'Geschäftsadresse',
    'auth.confirmPassword': 'Passwort bestätigen',
    'auth.loginButton': 'Anmelden',
    'auth.signupButton': 'Registrieren',
    'auth.noAccount': 'Kein Konto?',
    'auth.hasAccount': 'Bereits ein Konto?',
    
    // Common
    'common.contact': 'Kontakt',
    'common.terms': 'Bedingungen',
    'common.legal': 'Rechtliches'
  },
  
  IT: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Ricerca',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati',
    'nav.logout': 'Esci',
    'nav.profile': 'Il mio profilo',
    'nav.admin': 'Amministrazione',
    
    // Home
    'home.title': 'URBAvisu',
    'home.subtitle': 'Il tuo strumento di visualizzazione urbana per la Svizzera',
    'home.description': 'Analizza i dati urbani e territoriali con precisione. Ottieni rapporti dettagliati su parcelle e aree di interesse.',
    'home.getStarted': 'Inizia',
    'home.startSearch': 'Inizia una ricerca',
    
    // Features
    'features.title1': 'Dati catastali precisi',
    'features.desc1': 'Accedi alle informazioni ufficiali dei registri fondiari svizzeri',
    'features.title2': 'Rapporti personalizzati',
    'features.desc2': 'Genera rapporti dettagliati secondo le tue esigenze specifiche',
    'features.title3': 'Interfaccia intuitiva',
    'features.desc3': 'Navigazione semplice e visualizzazione chiara dei dati complessi',
    
    // Auth
    'auth.email': 'Indirizzo email',
    'auth.password': 'Password',
    'auth.firstName': 'Nome',
    'auth.lastName': 'Cognome',
    'auth.company': 'Azienda',
    'auth.address': 'Indirizzo professionale',
    'auth.confirmPassword': 'Conferma password',
    'auth.loginButton': 'Accedi',
    'auth.signupButton': 'Registrati',
    'auth.noAccount': 'Nessun account?',
    'auth.hasAccount': 'Già un account?',
    
    // Common
    'common.contact': 'Contatto',
    'common.terms': 'Termini',
    'common.legal': 'Note legali'
  },
  
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    'nav.logout': 'Logout',
    'nav.profile': 'My profile',
    'nav.admin': 'Administration',
    
    // Home
    'home.title': 'URBAvisu',
    'home.subtitle': 'Your urban visualization tool for Switzerland',
    'home.description': 'Analyze urban and territorial data with precision. Get detailed reports on parcels and areas of interest.',
    'home.getStarted': 'Get Started',
    'home.startSearch': 'Start a search',
    
    // Features
    'features.title1': 'Precise cadastral data',
    'features.desc1': 'Access official information from Swiss land registries',
    'features.title2': 'Custom reports',
    'features.desc2': 'Generate detailed reports according to your specific needs',
    'features.title3': 'Intuitive interface',
    'features.desc3': 'Simple navigation and clear visualization of complex data',
    
    // Auth
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.firstName': 'First name',
    'auth.lastName': 'Last name',
    'auth.company': 'Company',
    'auth.address': 'Business address',
    'auth.confirmPassword': 'Confirm password',
    'auth.loginButton': 'Login',
    'auth.signupButton': 'Sign up',
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Already have an account?',
    
    // Common
    'common.contact': 'Contact',
    'common.terms': 'Terms',
    'common.legal': 'Legal'
  }
}

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('FR')

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key
  }

  const changeLanguage = (lang) => {
    if (['FR', 'DE', 'IT', 'EN'].includes(lang)) {
      setCurrentLanguage(lang)
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  const value = {
    currentLanguage,
    t,
    changeLanguage
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}