# ☕ Beans What The

### 📘 Project Overview
The modern specialty coffee landscape is vast, complex, and often overwhelming for consumers seeking specific flavor profiles or origins. Traditional web applications typically rely on static search filters, lacking the personalized, conversational guidance of a domain expert.

To address this challenge, this project introduces the AI-Powered Coffee Bean Explorer—a distributed, cloud-hosted web application that bridges the gap between static product catalogs and intelligent, interactive customer service.

The application features:
- A dynamically rendered database of curated coffee beans
- A secure user authentication system
- A live, context-aware artificial intelligence assistant

Unlike conventional implementations that rely on third-party APIs such as OpenAI, this system independently hosts a localized Large Language Model (llama3.2), enabling greater control over inference, privacy, and customization.

## 🏗️ Tech Stack
### 🎨 Frontend & API Layer
Built with Next.js and deployed on Vercel.  
Handles UI rendering and serverless API routes.

### ⚙️ Backend (Serverless API Layer):
Implemented using Next.js API routes and hosted on Vercel.
Responsible for:
- Fetching data from Amazon DynamoDB
- Managing authentication via Amazon Cognito
- Routing requests to the AI inference engine

### 🤖 AI Inference Engine
Hosted on Amazon EC2 using Ollama with the llama3.2 model.
Provides a self-hosted AI assistant, removing reliance on external APIs.

### 🗄️ Database
Amazon DynamoDB stores the coffee bean catalog with scalable, low-latency access.

### 🔐 Authentication
Service: Amazon Cognito  
Handles secure user sign-in and session management.

## 🚀 Installation & Setup

1. Clone the repository:  
    ~~~bash
    git clone https://github.com/yhnothere/CloudComputingProject
    ~~~
2. Install dependencies:
    ~~~powershell
    cd frontend
    npm install 

    # install ollama
    irm https://ollama.com/install.ps1 | iex
    npm install ollama
    ~~~  

3. Set up environment variables:  
Create a `.env.local` file and include:
    ~~~env
    DYNAMO_REGION = ....
    DYNAMO_ACCESS_KEY = ....
    DYNAMO_SECRET_KEY = ....
    DYNAMO_SESSION_TOKEN = ....
    ~~~
4. Run the app:
    ~~~bash
    npm run dev
    ~~~

## ✨ Key Highlights
- Multi-cloud architecture (Vercel + AWS)
- Serverless backend using Next.js API routes
- Self-hosted LLM (llama3.2)
- Fully database-driven application
- Secure authentication with Cognito