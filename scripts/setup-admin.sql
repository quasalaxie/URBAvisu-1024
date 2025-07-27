-- Script de configuration de la base de données URBA visu

-- Créer les tables principales
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address TEXT NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'manager', 'admin', 'super_admin')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  validated BOOLEAN DEFAULT FALSE,
  address_verified BOOLEAN DEFAULT FALSE,
  proof_url TEXT,
  language TEXT DEFAULT 'FR',
  credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables de crédits
CREATE TABLE IF NOT EXISTS credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'gift', 'refund', 'usage')),
  quantity INTEGER NOT NULL,
  reason TEXT,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables de commandes
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  searched_address TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  total_cost INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Créer les tables de rapports
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  content JSONB NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables d'outils
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  credit_cost INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables de packs de crédits
CREATE TABLE IF NOT EXISTS credit_packs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  bonus_credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables d'actions (audit)
CREATE TABLE IF NOT EXISTS actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES users(id),
  target_id UUID REFERENCES users(id),
  agent_role TEXT NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables de messages automatiques
CREATE TABLE IF NOT EXISTS auto_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('validation', 'rejection', 'info_request')),
  text_fr TEXT NOT NULL,
  text_de TEXT,
  text_it TEXT,
  text_en TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer les tables de configuration système
CREATE TABLE IF NOT EXISTS system_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS de base
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Politiques pour les crédits
CREATE POLICY "Users can view their own credits" ON credits
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all credits" ON credits
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Politiques pour les outils (publiques en lecture)
CREATE POLICY "Tools are viewable by everyone" ON tools
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage tools" ON tools
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Politiques pour les packs de crédits (publiques en lecture)
CREATE POLICY "Credit packs are viewable by everyone" ON credit_packs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage credit packs" ON credit_packs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Politiques pour la configuration système
CREATE POLICY "Admins can manage system config" ON system_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );

-- Insérer les outils par défaut
INSERT INTO tools (name, description, is_free, credit_cost) VALUES
  ('Informations de base', 'Numéro de parcelle, surface de la parcelle', true, 0),
  ('Données cadastrales', 'Propriétaire, servitudes, historique', false, 5),
  ('Zonage et règlements', 'Zone d''affectation, coefficients d''utilisation', false, 3),
  ('Rapport environnemental', 'Contraintes environnementales, risques naturels', false, 8),
  ('Analyse complète', 'Toutes les données disponibles avec rapport détaillé', false, 15);

-- Insérer les packs de crédits par défaut
INSERT INTO credit_packs (name, credits, price, bonus_credits) VALUES
  ('Pack Starter', 10, 9.90, 0),
  ('Pack Standard', 25, 22.50, 2),
  ('Pack Premium', 50, 42.00, 8),
  ('Pack Professionnel', 100, 80.00, 20);

-- Insérer la configuration système par défaut
INSERT INTO system_config (key, value, description) VALUES
  ('auto_address_verification', 'false', 'Vérification automatique des adresses via Google Maps'),
  ('google_maps_api_key', '', 'Clé API Google Maps pour la vérification d''adresses'),
  ('default_language', 'FR', 'Langue par défaut de l''application'),
  ('registration_enabled', 'true', 'Autoriser les nouvelles inscriptions');

-- Insérer les messages automatiques par défaut
INSERT INTO auto_messages (type, text_fr, text_de, text_it, text_en) VALUES
  ('validation', 
   'Votre compte a été validé avec succès. Vous pouvez maintenant accéder à tous les outils gratuits.',
   'Ihr Konto wurde erfolgreich validiert. Sie können jetzt auf alle kostenlosen Tools zugreifen.',
   'Il tuo account è stato validato con successo. Ora puoi accedere a tutti gli strumenti gratuiti.',
   'Your account has been successfully validated. You can now access all free tools.'),
  ('rejection',
   'Votre demande de compte n''a pas pu être validée. Veuillez nous contacter pour plus d''informations.',
   'Ihre Kontoanfrage konnte nicht validiert werden. Bitte kontaktieren Sie uns für weitere Informationen.',
   'La tua richiesta di account non è stata validata. Contattaci per maggiori informazioni.',
   'Your account request could not be validated. Please contact us for more information.'),
  ('info_request',
   'Nous avons besoin d''informations supplémentaires pour valider votre compte. Veuillez fournir une preuve d''adresse.',
   'Wir benötigen zusätzliche Informationen zur Validierung Ihres Kontos. Bitte stellen Sie einen Adressnachweis zur Verfügung.',
   'Abbiamo bisogno di informazioni aggiuntive per validare il tuo account. Fornisci una prova di indirizzo.',
   'We need additional information to validate your account. Please provide proof of address.');

-- Créer une fonction pour créer le compte admin
CREATE OR REPLACE FUNCTION create_admin_account(
  admin_email TEXT,
  admin_password TEXT,
  admin_first_name TEXT DEFAULT 'Admin',
  admin_last_name TEXT DEFAULT 'System'
) RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Cette fonction doit être exécutée après avoir créé l'utilisateur via Supabase Auth
  -- Vous devrez créer manuellement l'utilisateur admin via l'interface Supabase Auth
  -- puis exécuter cette requête pour mettre à jour son profil :
  
  -- UPDATE users 
  -- SET role = 'super_admin', 
  --     status = 'approved', 
  --     validated = true,
  --     credits = 1000
  -- WHERE email = 'admin@urbavisu.ch';
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;