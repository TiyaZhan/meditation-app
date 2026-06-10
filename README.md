# Meditation App

The app lets people create meditation posts with written reflections, images, and optional location information. Users can also explore other posts and leave comments, turning a personal journal into a small community space for meditation experiences.

Repository: [TiyaZhan/meditation-app](https://github.com/TiyaZhan/meditation-app.git)

## What I Built

- User registration and login with session-based authentication
- Secure password hashing with bcrypt
- Meditation blog posts with rich text content
- Image uploads for journal entries
- Location-aware posts for tracking meaningful meditation places
- Commenting on shared meditation experiences
- A React frontend for the main user experience
- An Express and Sequelize backend connected to MySQL
- Unit and integration tests with Jest and Supertest
- Docker and Kubernetes configuration for deployment practice

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, TipTap
- **Backend:** Node.js, Express
- **Database:** MySQL with Sequelize ORM
- **Authentication:** Passport.js local strategy, Express sessions
- **Uploads:** Multer
- **Testing:** Jest, Supertest, SQLite for test runs
- **Build tools:** Webpack, Babel
- **Deployment:** Docker, Docker Compose, Kubernetes

## Project Structure

```text
meditation-app/
├── src/
│   ├── client/              # React frontend
│   ├── config/              # Database configuration
│   ├── middleware/          # Auth middleware
│   ├── models/              # Sequelize models
│   ├── routes/              # Express routes
│   ├── __unit_tests__/      # Unit tests
│   ├── __integ_tests__/     # Integration tests
│   └── app.js               # Express app entry point
├── views/                   # EJS page shell
├── public/uploads/          # Uploaded images
├── k8s/                     # Kubernetes manifests
├── Dockerfile
├── docker-compose.yml
├── webpack.config.js
└── package.json
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/TiyaZhan/meditation-app.git
cd meditation-app
```

Install dependencies:

```bash
npm install
```

Create a `.env` file for local development:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=med-app-dev
DB_USER=root
DB_PASSWORD=your_local_mysql_password
SESSION_SECRET=your_session_secret
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your_api_key
```

Start the development server:

```bash
npm run devStart
```

In a separate terminal, build or watch the frontend bundle:

```bash
npm run build
```

or:

```bash
npm run watch
```

## Testing

Run the full test suite:

```bash
npm test
```

Run unit tests only:

```bash
npm run test:unit
```

Run integration tests only:

```bash
npm run test:integration
```

## Deployment Notes

I included Docker and Kubernetes files so the app can be containerized and deployed in a more production-like environment.

Build the Docker image:

```bash
docker build -t meditation-app:latest .
```

Apply the Kubernetes manifests:

```bash
kubectl apply -f k8s/persistent-volumes.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/mysql-service.yaml
kubectl apply -f k8s/app-development.yaml
kubectl apply -f k8s/app-service.yaml
```

Check the deployment:

```bash
kubectl get pods
kubectl port-forward service/meditation-app-service 3000:3000
```

## Demo

I recorded a short demo video explaining the project and showing how the app works:

https://youtu.be/882FFAY7NNE

## Author

Tianya Zhan

GitHub: [TiyaZhan/meditation-app](https://github.com/TiyaZhan/meditation-app.git)

## License

This project is licensed under the ISC License.
