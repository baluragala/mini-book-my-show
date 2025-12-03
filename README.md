# 🎬 Mini BookMyShow

A lightweight movie ticket booking web application built with **Next.js 15**, designed to demonstrate containerization and deployment on **Google Cloud Platform**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![GCP](https://img.shields.io/badge/GCP-Cloud%20Run-4285F4?logo=googlecloud)

## ✨ Features

- 🎥 **Movie Listings** - Browse movies with ratings, genres, and descriptions
- 🕐 **Showtime Selection** - View available showtimes with real-time seat availability
- 💺 **Interactive Seat Selection** - 8×12 seat grid with visual booking status
- 🎫 **Instant Booking** - Book tickets and receive e-ticket confirmation
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: In-memory storage (resets on restart)
- **Deployment**: Docker + Google Cloud Run

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (for containerization)
- Google Cloud SDK (for GCP deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/baluragala/mini-book-my-show.git
   cd mini-book-my-show
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Test the APIs

```bash
# Get all movies
curl http://localhost:3000/api/movies

# Get movie details
curl http://localhost:3000/api/movies/1

# Get showtimes for a movie
curl http://localhost:3000/api/shows/1

# Get seat availability for a show
curl http://localhost:3000/api/seats/S1

# Book tickets
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -d '{"showId":"S1","seats":["A1","A2"]}'
```

---

## 🐳 Docker

### Build the Docker Image

```bash
docker build -t mini-bookmyshow .
```

### Run Locally with Docker

```bash
docker run -p 3000:3000 mini-bookmyshow
```

The app will be available at `http://localhost:3000`

### Build for Specific Platform (M1/M2 Mac)

```bash
docker build --platform linux/amd64 -t mini-bookmyshow .
```

---

## ☁️ Deploy to Google Cloud Run

### 1. Prerequisites Setup

```bash
# Install Google Cloud SDK (if not already installed)
# https://cloud.google.com/sdk/docs/install

# Login to GCP
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Create Artifact Registry Repository

```bash
gcloud artifacts repositories create bookmyshow-repo \
  --repository-format=docker \
  --location=asia-south1 \
  --description="Mini BookMyShow Docker images"
```

### 4. Build and Push Image

```bash
# Using Cloud Build (recommended)
gcloud builds submit --tag asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app

# OR build locally and push
docker build --platform linux/amd64 -t asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app .
docker push asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app
```

### 5. Deploy to Cloud Run

```bash
gcloud run deploy mini-bookmyshow \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --port 3000
```

### 6. Get the URL

After deployment, you'll receive a URL like:
```
https://mini-bookmyshow-xxxxx-xx.a.run.app
```

### Update Deployment

To update an existing deployment:
```bash
# Rebuild and push new image
gcloud builds submit --tag asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app

# Redeploy (Cloud Run will automatically use the latest image)
gcloud run deploy mini-bookmyshow \
  --image asia-south1-docker.pkg.dev/YOUR_PROJECT_ID/bookmyshow-repo/app \
  --region asia-south1
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | `http://localhost:3000` |

### Cloud Run Autoscaling

```bash
# Adjust autoscaling settings
gcloud run services update mini-bookmyshow \
  --region asia-south1 \
  --min-instances=0 \
  --max-instances=20 \
  --concurrency=80
```

---

## 📁 Project Structure

```
mini-book-my-show/
├── app/
│   ├── api/
│   │   ├── movies/          # GET /api/movies, /api/movies/:id
│   │   ├── shows/           # GET /api/shows/:movieId
│   │   ├── seats/           # GET /api/seats/:showId
│   │   └── book/            # POST /api/book
│   ├── movies/[id]/         # Movie details & booking pages
│   ├── booking/success/     # Booking confirmation page
│   ├── page.tsx             # Home page (movie list)
│   └── layout.tsx           # Root layout
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── MovieCard.tsx        # Movie card component
│   ├── MoviePoster.tsx      # Movie poster with fallback
│   ├── ShowtimeCard.tsx     # Showtime selection card
│   └── SeatGrid.tsx         # Interactive seat grid
├── lib/
│   ├── moviesStore.ts       # In-memory movie data
│   └── showsStore.ts        # In-memory shows & bookings
├── public/                  # Static assets
├── Dockerfile               # Docker configuration
└── package.json
```

---

## 📊 API Reference

### Movies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | List all movies |
| GET | `/api/movies/:id` | Get movie details |

### Shows

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shows/:movieId` | Get showtimes for a movie |
| GET | `/api/seats/:showId` | Get seat availability |

### Booking

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/book` | Book tickets |

**Booking Request:**
```json
{
  "showId": "S1",
  "seats": ["A1", "A2"]
}
```

**Booking Response:**
```json
{
  "success": true,
  "message": "Booking confirmed",
  "bookingId": "BKGXYZ123",
  "details": {
    "movieTitle": "Inception",
    "showTime": "10:30 AM",
    "screen": "Screen 1",
    "seats": ["A1", "A2"],
    "totalAmount": 300
  }
}
```

---

## 📝 Notes

- **Data Persistence**: This app uses in-memory storage. All bookings reset when the server restarts.
- **Concurrency**: Cloud Run instances don't share memory. Each instance has its own booking state.
- **Purpose**: This project is designed for learning GCP deployment, not production use.

---

## 📄 License

MIT License - feel free to use this project for learning and experimentation.

