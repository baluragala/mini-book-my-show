# 📘 **Mini BookMyShow App – Technical Specification (Next.js + Docker + GCP)**

## 1. **Project Overview**

Build a lightweight “Mini BookMyShow” web application that allows users to:

- View a list of movies
- View available showtimes
- Select seats
- Book tickets

**No real database** — data will be stored in **in-memory structures**, reset on every server restart.

Purpose:
✔ Learn how to deploy, auto-scale, monitor, and manage a microservice on **Google Cloud Platform**
✔ Practice containerizing a modern web app
✔ Understand Next.js app structure and server-side logic

---

# 2. **High-Level Architecture**

```
Next.js 15 App Router
│
├── Public pages (Movies, Details, Book Seats)
├── API Routes (/api/movies, /api/shows, /api/book)
│     └── In-memory stores for movies, shows, seats
│
Docker container
│
Google Cloud Run (autoscaling, HTTPS, revisions)
│
(Optional) Cloud Build or GitHub Actions CI/CD
```

No DB / No external dependencies.

---

# 3. **Features & Requirements**

## 3.1 **Movie List Page**

- Fetch from `/api/movies`
- Display:

  - Poster image (use static URLs)
  - Title
  - Genre
  - Rating

- Click → navigate to movie details page

## 3.2 **Movie Details Page**

- Fetch `/api/movies/:id`
- Display:

  - Movie Info
  - List of showtimes (from `/api/shows/:movieId`)
  - "Book" CTA leads to seat selection page

## 3.3 **Seat Selection Page**

- Fetch real-time seat availability from `/api/seats/:showId`
- Simple UI:

  - Grid of 8 rows × 12 columns
  - Mark:

    - Available: Gray
    - Selected: Blue
    - Booked: Red

- “Confirm Booking” → POST to `/api/book`

## 3.4 **Booking API**

POST `/api/book`
Request:

```json
{
  "showId": "SHOW123",
  "seats": ["A1", "A2"]
}
```

Response:

```json
{
  "success": true,
  "message": "Booking confirmed",
  "bookingId": "BKG78632"
}
```

## 3.5 **In-Memory Storage Design**

Two JS modules:

### moviesStore.js

```ts
export const movies = [
  {
    id: "1",
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    poster: "/posters/inception.jpg",
  },
  {
    id: "2",
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 8.6,
    poster: "/posters/interstellar.jpg",
  },
];
```

### showsStore.js

```ts
export const shows = {
  "1": [ { showId: "S1", time: "10:30AM", seats: {} }, ... ]
};
```

Seat states:

```
available | booked
```

---

# 4. **Next.js Application Structure**

```
/app
  /movies
    page.tsx
    [id]
      page.tsx
      /book
        page.tsx
  /api
    /movies
      route.ts
    /movies/[id]
      route.ts
    /shows/[movieId]
      route.ts
    /seats/[showId]
      route.ts
    /book
      route.ts

/lib
  moviesStore.ts
  showsStore.ts

/public
  /posters
```

---

# 5. **API Endpoints Specification**

### GET `/api/movies`

Returns array of movies.

### GET `/api/movies/:id`

Return movie details.

### GET `/api/shows/:movieId`

Returns all shows for a given movie.

### GET `/api/seats/:showId`

Return seat availability.

### POST `/api/book`

- Validate seats are free
- Mark them booked in in-memory store
- Return booking confirmation

---

# 6. **UI Requirements**

### 6.1 Styling

- Tailwind CSS recommended
- Layout:

  - Navbar with title “Mini BookMyShow”
  - Responsive movie cards grid

### 6.2 Seat Grid

A component:

```
SeatGrid
  - props: seatMap, onSelect
```

### 6.3 Booking Success Page

After booking:

```
Booking ID: XYZ123
Movie: Inception
Showtime: 10:30AM
Seats: A1, A2
```

---

# 7. **Environment Variables**

Even though no DB is used, define:

```
PORT=3000
NODE_ENV=production
```

For GCP:

```
NEXT_PUBLIC_BASE_URL=https://<cloudrun-app-url>
```

---

# 8. **Docker File Specification**

```
# Step 1: Base image
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Step 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

---

# 9. **Local Development Setup**

### Install deps:

```
npm install
npm run dev
```

### Test APIs:

```
curl http://localhost:3000/api/movies
```

### Test booking:

```
curl -X POST http://localhost:3000/api/book -H "Content-Type: application/json" -d '{"showId":"S1","seats":["A1"]}'
```

---

# 10. **Docker Build & Run Instructions**

### Build

```
docker build -t mini-bookmyshow .
```

### Run locally

```
docker run -p 3000:3000 mini-bookmyshow
```

---

# 11. **GCP Deployment Specification**

### Recommended: **Google Cloud Run**

#### Steps

1. **Enable APIs**

```
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

2. **Create Artifact Registry Repo**

```
gcloud artifacts repositories create bookmyshow-repo \
  --repository-format=docker \
  --location=asia-south1
```

3. **Build & Push to GCP**

```
gcloud builds submit --tag asia-south1-docker.pkg.dev/<PROJECT_ID>/bookmyshow-repo/app
```

4. **Deploy to Cloud Run**

```
gcloud run deploy mini-bookmyshow \
  --image asia-south1-docker.pkg.dev/<PROJECT_ID>/bookmyshow-repo/app \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --port 3000
```

5. Cloud Run URL example:

```
https://mini-bookmyshow-xyz.a.run.app
```

---

# 12. **Autoscaling Rules (Cloud Run)**

Default:

```
--min-instances=0
--max-instances=20
--cpu-throttling
```

You can adjust for demo scaling:

```
gcloud run services update mini-bookmyshow \
  --max-instances=50 \
  --concurrency=80
```

---

# 13. **Observability**

Cloud Run provides:

- Request logs
- Error logs
- Container logs
- Autoscale metrics
- Request latency chart

No additional setup necessary.
