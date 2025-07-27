# URBA visu

Application web de visualisation urbaine pour la Suisse.

## Fonctionnalités

- Authentification utilisateur avec Supabase
- Recherche d'adresses suisses
- Système de crédits et paiements en CHF
- Rapports détaillés sur les parcelles
- Interface multilingue (FR, DE, IT, EN)
- Design minimaliste suisse

## Configuration

1. Créer un projet Supabase
2. Configurer les variables d'environnement :
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Base de données Supabase

Créer les tables suivantes :

```sql
-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT NOT NULL,
  address TEXT NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'manager', 'admin', 'super_admin')),
  validated BOOLEAN DEFAULT FALSE,
  proof_url TEXT,
  language TEXT DEFAULT 'FR',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credits table
CREATE TABLE credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'gift', 'refund')),
  quantity INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  searched_address TEXT NOT NULL,
  options JSONB NOT NULL,
  total_cost INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Actions table (for audit trail)
CREATE TABLE actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES users(id),
  target_id UUID REFERENCES users(id),
  agent_role TEXT NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto messages table
CREATE TABLE auto_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('validation', 'rejection', 'info_request')),
  text_fr TEXT NOT NULL,
  text_de TEXT,
  text_it TEXT,
  text_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Compte administrateur par défaut

Email: admin@admin.com
Mot de passe: admin123

## Développement

```bash
npm install
npm run dev
```

## Déploiement

L'application est configurée pour être déployée sur Netlify avec HashRouter.