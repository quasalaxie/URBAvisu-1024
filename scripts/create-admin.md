# Création du compte administrateur URBA visu

## Étapes pour créer le compte admin :

### 1. Connecter Supabase
- Aller dans les paramètres du projet
- Connecter votre projet Supabase avec les identifiants

### 2. Exécuter le script de base de données
- Copier le contenu de `setup-admin.sql`
- L'exécuter dans l'éditeur SQL de Supabase

### 3. Créer l'utilisateur admin via Supabase Auth
- Aller dans Authentication > Users dans Supabase
- Cliquer sur "Add user"
- Créer un utilisateur avec :
  - Email: `admin@urbavisu.ch`
  - Password: `Admin123!`
  - Email confirmed: ✅ Oui

### 4. Mettre à jour le profil admin
Exécuter cette requête SQL dans Supabase :

```sql
-- Insérer le profil admin
INSERT INTO users (
  id,
  email,
  first_name,
  last_name,
  company,
  address,
  role,
  status,
  validated,
  address_verified,
  credits,
  language
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@urbavisu.ch'),
  'admin@urbavisu.ch',
  'Administrateur',
  'Système',
  'URBA visu',
  'Route de la Capite 104, 1223 Cologny, Suisse',
  'super_admin',
  'approved',
  true,
  true,
  1000,
  'FR'
) ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  status = 'approved',
  validated = true,
  address_verified = true,
  credits = 1000;
```

## Identifiants de connexion admin :

**Email:** `admin@urbavisu.ch`  
**Mot de passe:** `Admin123!`

## Fonctionnalités admin disponibles :

1. **Gestion des utilisateurs**
   - Validation/rejet des comptes
   - Modification des crédits
   - Changement de rôles

2. **Gestion des outils**
   - Création/modification d'outils
   - Configuration des prix
   - Activation/désactivation

3. **Configuration système**
   - Vérification automatique d'adresses
   - Clé API Google Maps
   - Paramètres globaux

4. **Audit et historique**
   - Suivi des actions administratives
   - Historique des modifications

## Note importante :
Une fois connecté en tant qu'admin, vous pourrez accéder au panneau d'administration via l'URL `/admin` ou via le bouton dans l'interface utilisateur.