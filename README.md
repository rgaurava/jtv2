# SpringAI B2B Transaction Platform

A modern B2B transaction management platform built with Spring Boot 3, Spring AI, PostgreSQL with pgvector, and React with TypeScript and Tailwind CSS.

## Features

### Backend
- **Spring Boot 3** with Java 21
- **Spring AI** integration with OpenAI for AI-powered transaction insights
- **PostgreSQL** database with **pgvector** extension for vector similarity search
- **Spring Security** with JWT authentication
- RESTful API architecture
- Password reset functionality
- Comprehensive transaction management

### Frontend
- **React 18** with **TypeScript**
- **Tailwind CSS** for modern, responsive UI
- **Dark/Light theme** toggle with persistent preference
- Comprehensive authentication flows (Login, Register, Forgot Password)
- 3-panel admin dashboard:
  - **Left Panel**: Navigation sidebar with user info
  - **Center Panel**: Transaction list with search and statistics
  - **Right Panel**: Detailed transaction view with AI insights
- Static pages (Privacy Policy, Terms & Conditions, Security)

## Architecture

```
springai-b2b-platform/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/springai/b2b/
│   │       ├── config/      # Security, CORS configuration
│   │       ├── controller/  # REST API controllers
│   │       ├── dto/         # Data Transfer Objects
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # JPA repositories
│   │       ├── security/    # JWT, authentication
│   │       └── service/     # Business logic
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (Auth, Theme)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
└── docker-compose.yml       # PostgreSQL with pgvector
```

## Prerequisites

- **Java 21** or higher
- **Maven 3.8+**
- **Node.js 18+** and npm
- **Docker** and Docker Compose (for PostgreSQL)
- **OpenAI API Key** (for AI features)

## Getting Started

### 1. Clone the Repository

```bash
cd springai-b2b-platform
```

### 2. Set Up PostgreSQL with pgvector

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will start PostgreSQL 16 with the pgvector extension on port 5432.

### 3. Configure Backend

#### Set Environment Variables

Create a `.env` file in the `backend` directory or set environment variables:

```bash
# OpenAI API Key (required for AI features)
export OPENAI_API_KEY=your-openai-api-key-here

# JWT Secret (optional, default provided)
export JWT_SECRET=your-secret-key-here
```

#### Alternative: Update application.yml

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  ai:
    openai:
      api-key: your-openai-api-key-here
```

### 4. Build and Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Note**: On first run, a root user will be automatically created when you register the first account (it will have ADMIN and USER roles).

### 5. Set Up Frontend

```bash
cd frontend
npm install
```

Create `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env` if needed (default API URL is `http://localhost:8080/api`):

```
VITE_API_URL=http://localhost:8080/api
```

### 6. Run Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Default Credentials

The first user you register will automatically become an admin. Use the registration page to create your account.

## Usage

### Authentication

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Forgot Password**: Reset password at `/forgot-password`

### Dashboard Features

- **Create Transaction**: Click "New Transaction" button in the sidebar
- **View Transactions**: Browse all transactions in the center panel
- **Search**: Use the search bar to filter transactions
- **View Details**: Click on any transaction to see detailed information in the right panel
- **AI Insights**: Each transaction includes AI-powered risk assessment and recommendations
- **Update Status**: Change transaction status from the details panel
- **Theme Toggle**: Switch between light and dark modes

### Transaction Workflow

1. Create a transaction with buyer/seller information
2. AI automatically analyzes the transaction
3. Update status as the transaction progresses
4. View detailed insights and history

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/{id}` - Get transaction by ID
- `PUT /api/transactions/{id}` - Update transaction
- `PATCH /api/transactions/{id}/status` - Update status
- `DELETE /api/transactions/{id}` - Delete transaction

## Technology Stack

### Backend
- Spring Boot 3.2.1
- Spring AI 1.0.0-M4
- Spring Security with JWT
- PostgreSQL 16
- pgvector for vector embeddings
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Lucide React (icons)

## Database Schema

### Users Table
- User credentials and profile
- Role-based access control
- Password reset tokens

### B2B Transactions Table
- Transaction details
- Financial information
- AI-generated insights
- Audit timestamps

### Vector Store Table
- Embedding storage for Spring AI
- HNSW index for similarity search

## Security Features

- JWT-based authentication
- Bcrypt password hashing
- CORS configuration
- SQL injection prevention
- XSS protection
- Secure password reset flow

## Development

### Backend Development

```bash
cd backend
mvn spring-boot:run
```

Changes will require restart. Consider using Spring Boot DevTools for auto-reload.

### Frontend Development

```bash
cd frontend
npm run dev
```

Hot Module Replacement (HMR) is enabled for instant updates.

### Build for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/b2b-platform-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the dist/ folder with your preferred web server
```

## Environment Variables

### Backend
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `JWT_SECRET` - Secret key for JWT signing
- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password

### Frontend
- `VITE_API_URL` - Backend API URL

## Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running: `docker-compose ps`
- Check Java version: `java -version` (should be 21+)
- Verify database connection in application.yml

### Frontend won't connect to backend
- Check backend is running on port 8080
- Verify VITE_API_URL in .env file
- Check browser console for CORS errors

### AI features not working
- Ensure OPENAI_API_KEY is set correctly
- Check OpenAI API quota and credits
- Review backend logs for AI-related errors

### Database connection issues
- Restart PostgreSQL: `docker-compose restart`
- Check database logs: `docker-compose logs postgres`
- Verify port 5432 is not in use

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.

## Acknowledgments

- Spring AI team for the excellent AI integration framework
- PostgreSQL pgvector extension for vector similarity search
- Tailwind CSS for the utility-first CSS framework
- React and Vite teams for the amazing development experience
