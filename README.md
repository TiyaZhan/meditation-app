# Meditation App

The app lets people create meditation posts with written reflections, images, and optional location information. Users can also explore other posts and leave comments, turning a personal journal into a small community space for meditation experiences.

Repository: [TiyaZhan/meditation-app](https://github.com/TiyaZhan/meditation-app.git)

Live website: [meditation-app-production-2840.up.railway.app](https://meditation-app-production-2840.up.railway.app)

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
- **Deployment:** Railway with Docker
- **Infrastructure examples:** Docker Compose and Kubernetes manifests

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
├── k8s/                     # Legacy Kubernetes deployment examples
├── Dockerfile
├── docker-compose.yml
├── webpack.config.js
└── package.json
```

## Getting Started

Local development requires Node.js 20 and MySQL 8.

Clone the repository:

```bash
git clone https://github.com/TiyaZhan/meditation-app.git
cd meditation-app
```

Install dependencies:

```bash
npm install
```

Start MySQL and create the local database if it does not already exist:

```sql
CREATE DATABASE `med-app-dev`;
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

Build the frontend bundle:

```bash
npm run build
```

Start the development server:

```bash
npm run devStart
```

The application will be available at `http://localhost:3000`. To rebuild the
frontend automatically while editing client code, run this in a separate
terminal:

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

## Author

Tianya Zhan

GitHub: [TiyaZhan/meditation-app](https://github.com/TiyaZhan/meditation-app.git)

## License

This project is licensed under the ISC License.
