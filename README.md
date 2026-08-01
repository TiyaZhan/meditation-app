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

## Deploying to Railway

The application can run on Railway as two services: this repository and a
Railway MySQL database.

1. Create a Railway project and deploy this GitHub repository.
2. Add a MySQL database to the same Railway project.
3. In the application service, add these reference variables from the MySQL
   service:

   ```env
   NODE_ENV=production
   SESSION_SECRET=generate-a-long-random-secret
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   GOOGLE_MAPS_API_KEY=your_api_key
   UPLOAD_DIR=/usr/src/app/public/uploads
   ```

   If the database service has a different name, replace `MySQL` in the
   reference expressions with that service name. Railway supplies `PORT`
   automatically, so do not set it manually.

4. Attach a volume to the application service at
   `/usr/src/app/public/uploads`. Without it, uploaded images disappear after
   a redeploy.
5. Generate a public domain for the application service.
6. Set the health-check path to `/health` and deploy.

The Dockerfile installs production dependencies, builds the React bundle, and
starts Express with `npm start`. The application creates its Sequelize tables
and persistent session table on startup.

## Demo

I recorded a short demo video explaining the project and showing how the app works:

https://youtu.be/882FFAY7NNE

## Author

Tianya Zhan

GitHub: [TiyaZhan/meditation-app](https://github.com/TiyaZhan/meditation-app.git)

## License

This project is licensed under the ISC License.
