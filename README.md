# 🍽️ Giving Plate – AI-Powered Hunger-Saving Platform

> A socially impactful, AI-powered platform connecting surplus food providers with orphanages, NGOs, and old-age homes — aiming to eliminate food waste and end hunger in India.

---

## 📌 Problem

India wastes **over 70 million tonnes of food annually**, while millions go to bed hungry. There is no streamlined mechanism to **redistribute excess food** from restaurants, events, and individuals to the ones who need it most — efficiently, in real time.

---

## 🎯 Solution

**Giving Plate** is a web platform that uses **AI and geolocation** to intelligently match **surplus food donors** with **verified food receivers** based on:
- Location proximity
- Food type and dietary needs
- Quantity and urgency (expiry time)
- NGO demand forecasting

---

## 🧠 Key Features

### 🚀 Core Platform
- 🌍 **Location-Based Matching** using Geoapify Maps
- 🧾 **Structured Donation System** for food input
- 🧓 **NGO Dashboard** for food requests & acceptance
- 🗺️ **Live Map View** of active donations

### 🤖 AI-Powered Matching Engine
- 🔍 Calculates **urgency scores** using expiry time
- 📏 Uses haversine distance for proximity
- 🧮 Ranks NGOs based on capacity match, diet type, and freshness

### 📸 Food Image Classification *(Optional)*
- Upload a food image → AI classifies the food type
- Helps receivers prepare properly or filter preferences

### 📈 Impact Analytics
- Meals saved
- Waste reduced
- Environmental footprint (CO₂ saved)
- Live donation map

### 🤖 Chatbot Integration *(Optional)*
- AI chatbot (Gemini/OpenAI/Rasa) to accept donations via natural language:
  > “I have 10 plates of biryani in Hyderabad ready for pickup by 4PM.”

### 🧪 Demand Prediction *(Optional)*
- NGO need forecasting using time-series modeling (ARIMA/ML)

---

## 🖥️ Live Demo

[🚀 View Demo](https://givingplate.vercel.app)  
_(Demo URL will go here once deployed)_

---

## 🏗️ Tech Stack

| Area | Tools/Frameworks |
|------|------------------|
| Frontend | React.js, Tailwind CSS, React-Leaflet |
| Backend | FastAPI (Python) |
| Database | PostgreSQL + PostGIS |
| AI Models | scikit-learn, TensorFlow, Pandas |
| Maps & Location | Geoapify API |
| Hosting | Vercel (frontend), Render/Railway (backend), ElephantSQL (DB) |
| File Storage | Cloudinary (food image upload) |
| Authentication | Firebase/Auth0 |
| Optional Bot | Gemini API, Rasa NLU |

---

## 📦 Project Structure

```bash
.
├── client/               # React frontend
│   ├── components/
│   ├── pages/
│   └── ...
├── server/               # FastAPI backend
│   ├── models/
│   ├── routes/
│   ├── ml/               # AI matching engine, food classification
│   └── ...
├── database/
│   └── schema.sql
├── .env
├── README.md
└── requirements.txt

⚙️ Installation Guide
1. Clone the Repo

git clone https://github.com/your-username/giving-plate.git
cd giving-plate

2. Frontend Setup
cd client
npm install
npm run dev

3. Backend Setup

cd server
pip install -r requirements.txt
uvicorn main:app --reload
4. Setup PostgreSQL + PostGIS
Create database on ElephantSQL

Enable PostGIS extension if needed locally

5. Geoapify API Key
Get a free API key: https://myprojects.geoapify.com/

Add to .env:

GEOAPIFY_API_KEY=your_key_here
🧪 AI Match Engine Overview
Calculates match scores based on:

Distance

Dietary preference

NGO capacity

Food expiry urgency

def match_score(food, ngo):
    urgency = 10 / hours_to_expiry(food['expiry'])
    distance = haversine(food['location'], ngo['location'])
    capacity_ratio = min(ngo['capacity'], food['quantity']) / food['quantity']
    return (1 / distance) * urgency * capacity_ratio

🌱 Social Impact
🥗 0 Hunger (UN SDG Goal 2)

🍱 Reduced food waste from events, restaurants, individuals

🤝 Empowering NGOs and volunteers with real-time tools

🌍 Environmental benefits from waste reduction & carbon savings

🛠️ Future Enhancements
WhatsApp & SMS bot for donor onboarding

Volunteer delivery route optimization

Real-time alerts for high-urgency items

Multilingual UI

Impact badges for frequent donors

🤝 Contributing
We welcome contributors to join this mission-driven project.

git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
