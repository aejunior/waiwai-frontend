# Usar uma imagem base oficial do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta em que o Vite roda
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
