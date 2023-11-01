# Usa Node.js como imagen base
FROM node:latest as my_stage

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia los archivos de la carpeta 'public' al directorio de trabajo en el contenedor
COPY public /app/public

# Copia los archivos de la carpeta 'src' al directorio de trabajo en el contenedor
COPY src /app/src

# Construye la aplicación de React para producción
RUN npm run build

# Instala un servidor ligero para servir la aplicación (si es necesario)
RUN npm install -g serve

# Establece el comando para iniciar la aplicación
CMD ["serve", "-s", "build", "-l", "3000"]
