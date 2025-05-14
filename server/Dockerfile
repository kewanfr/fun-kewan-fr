# Serveur Node.js léger
FROM node:18-alpine

# Crée et utilise le répertoire /app
WORKDIR /app

# Installe les dépendances en mode production
COPY package*.json ./
RUN npm install --production

# Copie le code source
COPY . .

# Expose le port de l’API
EXPOSE 4000

# Démarre le serveur
CMD ["node", "index.js"]
