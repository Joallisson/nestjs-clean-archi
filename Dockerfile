# Use a imagem oficial do Node.js como base
FROM node:18

# Crie e defina o diretório de trabalho na imagem do Docker
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compile a aplicação NestJS
RUN npm run build

# Gere os artefatos do Prisma e execute as migrações
# RUN npx prisma generate --schema ./src/shared/infrastructure/database/prisma/schema.prisma
# RUN npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma

# Informe ao Docker que a aplicação escuta na porta 3000
EXPOSE 3000

# Comando para rodar a aplicação NestJS
CMD npx prisma generate --schema ./src/shared/infrastructure/database/prisma/schema.prisma \
    && npx prisma migrate deploy --schema ./src/shared/infrastructure/database/prisma/schema.prisma \
    && npm run start:prod
