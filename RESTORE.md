# Environment Restoration Guide

## Prerequisites
- Java 24 installed at `/Library/Java/JavaVirtualMachines/jdk-24.jdk/Contents/Home`
- Node.js and npm installed
- PostgreSQL installed and running
- Git configured

## Step-by-Step Restoration

### 1. Clone Repository (if needed)
```bash
cd /Users/rgaurava/jtv2
git clone https://github.com/rgaurava/jtv2.git springai-b2b-platform
cd springai-b2b-platform
```

### 2. Verify Java Version
```bash
java -version
# Should show: java version "24"

# If not, set JAVA_HOME
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-24.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```

### 3. Restore Backend Dependencies
```bash
cd backend

# Clean and install all Maven dependencies
mvn clean install

# Verify IPWorks libraries are in local repo
ls ~/.m2/repository/ipworks/
```

### 4. Restore Frontend Dependencies
```bash
cd ../frontend

# Install all npm dependencies
npm install
```

### 5. Restore Database (if you have a backup)
```bash
# Create database if it doesn't exist
psql -U postgres -c "CREATE DATABASE sail_platform;"

# Enable pgvector extension
psql -U postgres -d sail_platform -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Restore from backup (if exists)
psql -U postgres -d sail_platform < ~/backups/sail_platform_backup.sql
```

### 6. Configure Environment Variables
Create `backend/src/main/resources/application-local.properties`:
```properties
# OpenAI API Key (if using AI features)
spring.ai.openai.api-key=YOUR_OPENAI_API_KEY

# Database connection (adjust if needed)
spring.datasource.url=jdbc:postgresql://localhost:5432/sail_platform
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
```

Create `frontend/.env.local` (if needed):
```env
VITE_API_URL=http://localhost:8080/api
```

### 7. Start the Application
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 8. Verify Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Health check: http://localhost:8080/actuator/health (if enabled)

## Current Stack Versions
- Java: 24
- Spring Boot: 3.4.1
- Spring AI: 1.0.3
- Lombok: 1.18.40
- Apache Groovy: 5.0.0
- IPWorks: 2025
- React: 19
- Vite: 6
- Node: (check with `node -v`)

## Database Schema
The application uses JPA auto-DDL. On first run with an empty database, tables will be created automatically based on entity classes.

## Troubleshooting

### Maven Build Fails
```bash
# Clear local Maven cache
rm -rf ~/.m2/repository

# Re-download dependencies
mvn clean install -U
```

### Lombok Not Working
Verify annotation processor configuration in `pom.xml`:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>24</source>
        <target>24</target>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.40</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

### PostgreSQL Connection Issues
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql@14

# Or use system postgres
sudo service postgresql start
```

### Port Conflicts
- Backend (8080): Check with `lsof -i :8080`
- Frontend (5173): Check with `lsof -i :5173`

## Backup Strategy

### Daily Database Backup (recommended)
```bash
# Add to cron or run manually
pg_dump -U postgres -d sail_platform > ~/backups/sail_platform_$(date +%Y%m%d).sql
```

### Git Workflow
```bash
# Always commit your work
git add .
git commit -m "Your changes"
git push

# Pull latest changes after restart
git pull
```

## Files NOT in Git (Backup Separately)
- `backend/src/main/resources/application-local.properties` (secrets)
- `frontend/.env.local` (secrets)
- Database backups
- Uploaded files (if any)
- Logs (if important)

## Quick Start After Crash
```bash
cd /Users/rgaurava/jtv2/springai-b2b-platform
git pull  # Get latest changes
cd backend && mvn clean install  # Restore Maven deps
cd ../frontend && npm install  # Restore npm deps
# Start servers (see step 7)
```
