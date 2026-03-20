# 🧢 Pokedex - Application fullstack

Application web fullstack permettant de consulter des Pokémon, créer des équipes et voter pour ses favoris.

👉 Projet réalisé dans le cadre de ma formation, avec une approche API REST + frontend moderne (SvelteKit).

---

## 🚀 Démo & aperçu

- 📱 Interface moderne et responsive
- 🖼️ Images officielles des Pokémon
- 🎨 Types colorés dynamiques
- ⚡ Navigation rapide avec SvelteKit

---

## 🧠 Fonctionnalités principales

### 🔎 Consultation des Pokémon
- Liste complète des 151 Pokémon (Gen 1)
- Affichage des statistiques
- Types associés avec couleurs dynamiques
- Page détail Pokémon  

### 🧬 Types
- Page dédiée listant tous les types Pokémon
- UI claire avec code couleur

### 🗳️ Système de vote
- Les utilisateurs peuvent voter pour leurs Pokémon favoris
- Stockage en base avec relation utilisateur ↔ vote

### 👥 Authentification
- Inscription / connexion
- Gestion des rôles (admin / user)

### 🧢 Teams
- Création d’équipes Pokémon
- Association Pokémon ↔ équipe
- Gestion des relations en base (Many-to-Many)

---

## 🛠️ Stack technique

### Backend
- Node.js / Express
- Sequelize ORM
- PostgreSQL
- Architecture MVC

### Frontend
- SvelteKit (Svelte 5)
- Vite
- Fetch API

---

## ⚙️ Ce que ce projet démontre

- ✔️ Conception d’une API REST complète  
- ✔️ Modélisation de base de données relationnelle  
- ✔️ Gestion des relations complexes (Many-to-Many)  
- ✔️ Authentification utilisateur sécurisée  
- ✔️ Intégration frontend moderne (SvelteKit)  
- ✔️ Gestion d’état et rendering dynamique  
- ✔️ Organisation clean du code (backend + frontend séparés)

---

## 🗂️ Architecture

.
├── api/  
├── client/  

---

## ⚡ Installation rapide

### Backend

cd api  
npm install  
npm run db:reset  
npm run dev  

---

### Frontend

cd client    
npm install  
npm run dev  

---

## 📡 API (extraits)

GET /pokemons  
GET /types  
POST /auth/login  
POST /teams  

---

## 🖼️ Gestion des images

https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png

---

## 🔧 Améliorations possibles

- Filtrage par type  
- Système de favoris  
- Amélioration UX/UI  
- Déploiement  

---

## 👨‍💻 Auteur

Charly Lamena 

---
