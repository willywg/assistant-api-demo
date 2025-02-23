# OpenAI Assistant API Demo

Demo de un chatbot implementado con OpenAI Assistant API y desplegado en Vercel.

## Tecnologías Utilizadas

- **Backend:**
  - Node.js con Express
  - OpenAI API (Assistants API)
  - Server-Sent Events (SSE) para streaming
  - Vercel para deployment

- **Frontend:**
  - HTML/JavaScript vanilla
  - Tailwind CSS
  - DaisyUI
  - Marked.js para renderizado de Markdown

## Requisitos Previos

- Node.js (v22 o superior)
- Una cuenta en OpenAI con acceso a la API
- Un Assistant creado en OpenAI (guarda su ID)

## Configuración Local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/willywg/assistant-api-demo.git
   cd assistant-api-demo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```plaintext
   OPENAI_API_TOKEN=tu-api-key-de-openai
   ASSISTANT_ID=tu-assistant-id
   PORT=3050
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3050`


## Características

- Streaming de respuestas en tiempo real
- Soporte para formato Markdown en las respuestas
- Persistencia de conversación usando Threads de OpenAI
- Interfaz responsiva con Tailwind CSS
- Listo para deployment en Vercel

## Deployment

El proyecto está configurado para ser desplegado en Vercel. Asegúrate de configurar las variables de entorno (`OPENAI_API_TOKEN` y `ASSISTANT_ID`) en la configuración de tu proyecto en Vercel.

## Notas Importantes

- El proyecto usa la API de Assistants de OpenAI, que está en beta
- Asegúrate de tener suficientes créditos en tu cuenta de OpenAI
