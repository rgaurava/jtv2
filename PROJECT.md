# SAIL Platform - Spring AI B2B Transaction Platform

## Project Overview
**SAIL** (Spring AI Integration Layer) is an AI-powered B2B transaction management platform developed for **Justransform** company. It combines Spring Boot backend with Spring AI capabilities, React frontend, and PostgreSQL with pgvector for AI-enhanced transaction processing.

## Technology Stack (Current Versions)

### Backend
- **Java**: 24 (JDK at `/Library/Java/JavaVirtualMachines/jdk-24.jdk/Contents/Home`)
- **Spring Boot**: 3.4.1 (latest stable)
- **Spring AI**: 1.0.3 (stable release - upgraded from milestone M4)
- **Lombok**: 1.18.40 (Java 24 compatible with explicit annotation processor)
- **Apache Groovy**: 5.0.0 (for dynamic scripting and transformations)
- **IPWorks Libraries**: 2025 (commercial B2B integration suite)
  - `ipworks` - Core networking components
  - `ipworksedi` - EDI (Electronic Data Interchange) processing
  - `ipworksopenpgp` - PGP encryption
  - `ipworksssh` - SSH/SFTP file transfers
  - `ipworksencrypt` - Encryption/decryption utilities
- **PostgreSQL**: Database with pgvector extension for AI embeddings
- **Build Tool**: Maven

### Frontend
- **React**: 19
- **Vite**: 6 (build tool)
- **TypeScript**: Latest
- **TailwindCSS**: For styling
- **Lucide React**: Icon library
- **React Router**: Navigation

### Design System
- **Theme**: SAIL (Justransform branding)
- **Colors**:
  - Primary: Cyan (`#00CED1`, `#06B6D4`)
  - Secondary: Purple (`#9333EA`, `#A855F7`)
  - Success: Green (`#10B981`)
  - Dark theme: Charcoal backgrounds
- **Design Philosophy**: Compact UI with maximum screen real estate
- **Spacing**: Reduced padding/margins throughout (p-2, space-y-3, etc.)
- **Font Sizes**: Compact (text-xs, text-sm, text-[10px])
- **Logo**: `/logos/justransform-logo.svg` (light), `/logos/justransform-logo_w.svg` (dark)

## Project Structure

```
springai-b2b-platform/
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/springai/
│   │   ├── config/                   # Configuration classes
│   │   │   ├── SecurityConfig.java
│   │   │   ├── VectorStoreConfig.java
│   │   │   └── WebConfig.java
│   │   ├── controller/               # REST API controllers
│   │   │   ├── AuthController.java
│   │   │   └── TransactionController.java
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── TransactionDTO.java
│   │   ├── model/                    # JPA Entity classes
│   │   │   ├── User.java
│   │   │   └── Transaction.java
│   │   ├── repository/               # JPA Repositories
│   │   │   ├── UserRepository.java
│   │   │   └── TransactionRepository.java
│   │   ├── security/                 # Security components
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── JwtTokenProvider.java
│   │   │   └── UserDetailsServiceImpl.java
│   │   ├── service/                  # Business logic
│   │   │   ├── TransactionService.java
│   │   │   └── UserService.java
│   │   └── B2bPlatformApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties     # Main configuration
│   │   └── application-local.properties # Local secrets (NOT in Git)
│   └── pom.xml                       # Maven dependencies
│
├── frontend/                         # React application
│   ├── public/
│   │   └── logos/                    # Justransform branding assets
│   │       ├── justransform-logo.svg
│   │       └── justransform-logo_w.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/            # Main dashboard components
│   │   │   │   ├── Sidebar.tsx       # Left navigation (w-52, compact)
│   │   │   │   ├── MainPanel.tsx     # Central transaction list
│   │   │   │   ├── TransactionCard.tsx # Individual transaction card
│   │   │   │   └── DetailsPanel.tsx  # Right details panel (w-72)
│   │   │   └── ui/                   # Reusable UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       └── ThemeToggle.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx       # Authentication state
│   │   │   └── ThemeContext.tsx      # Dark/light theme
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx         # Main app page
│   │   │   ├── Login.tsx            # Compact login (updated)
│   │   │   └── Register.tsx         # Compact registration (updated)
│   │   ├── services/
│   │   │   └── api.ts               # API client
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript definitions
│   │   └── App.tsx                  # Root component
│   ├── package.json                 # npm dependencies
│   ├── tailwind.config.js           # SAIL theme colors
│   └── vite.config.ts               # Vite configuration
│
├── RESTORE.md                       # Disaster recovery guide
├── backup.sh                        # Automated backup script
├── PROJECT.md                       # This file - project knowledge base
└── README.md                        # Project overview (if exists)
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(50),
    company_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    buyer_company VARCHAR(255) NOT NULL,
    seller_company VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    delivery_date DATE,
    payment_terms VARCHAR(255),
    notes TEXT,
    ai_insights TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- pgvector extension for AI embeddings
CREATE EXTENSION IF NOT EXISTS vector;
```

### Transaction Status Enum
- `PENDING` - Initial state
- `APPROVED` - Transaction approved
- `IN_PROGRESS` - Being processed
- `COMPLETED` - Successfully completed
- `CANCELLED` - Cancelled by user
- `REJECTED` - Rejected (validation failed)

## Key Design Decisions & History

### UI Design Evolution
1. **Initial Design**: Standard spacing, larger components
2. **Compact UI Transformation** (Recent):
   - All components redesigned for maximum screen real estate
   - Sidebar: w-64 → w-52, reduced padding throughout
   - Details panel: w-96 → w-72
   - Font sizes: Reduced across all components (text-sm → text-xs, etc.)
   - Logo: h-20 → h-12
   - Transaction cards: Tighter spacing, smaller badges
   - Login/Register pages: Updated to match compact design

### Technology Upgrade Path
1. **Spring Boot**: 3.2.1 → 3.4.1 (latest stable)
2. **Spring AI**: 1.0.0-M4 (milestone) → 1.0.3 (stable)
   - **Breaking Change**: Artifact names changed
     - Old: `spring-ai-openai-spring-boot-starter`
     - New: `spring-ai-starter-model-openai`
3. **Java**: 21 → 24
   - Required Lombok 1.18.40 for compatibility
   - Required explicit annotation processor configuration
4. **Groovy**: Added 5.0.0 for scripting capabilities
5. **IPWorks**: Added 2025 suite for B2B integrations

### Critical Configuration Notes

#### Maven Compiler Plugin (Required for Java 24 + Lombok)
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
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

**Why?** Java 24 requires explicit annotation processor configuration for Lombok. Without this, Lombok annotations don't generate code and build fails.

#### IPWorks Libraries
- Installed locally in `~/.m2/repository/ipworks/`
- Required for B2B transaction processing (EDI, SFTP, encryption)
- Version 2025 (latest)
- All jars pre-installed in local Maven repository

## Development Workflow

### Starting the Application
```bash
# Terminal 1 - Backend (port 8080)
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

### Building
```bash
# Backend
cd backend
mvn clean install

# Frontend
cd frontend
npm run build
```

### Database Setup
```bash
# Create database
psql -U postgres -c "CREATE DATABASE sail_platform;"

# Enable pgvector
psql -U postgres -d sail_platform -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Tables created automatically by JPA on first run
```

### Backup Strategy
```bash
# Run backup script
./backup.sh

# Backs up to: ~/backups/sail_platform/
# - Database snapshots
# - Environment config files
# - Auto-deletes backups older than 7 days
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT)

### Transactions
- `GET /api/transactions` - List all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/{id}` - Update transaction
- `PATCH /api/transactions/{id}/status` - Update transaction status
- `DELETE /api/transactions/{id}` - Delete transaction

### AI Features (Future)
- Transaction insights generation
- Vector similarity search
- Anomaly detection
- Automated categorization

## Environment Variables

### Backend (`application-local.properties`)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/sail_platform
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

# OpenAI API (for Spring AI features)
spring.ai.openai.api-key=YOUR_OPENAI_API_KEY

# JWT Secret
jwt.secret=YOUR_JWT_SECRET

# pgvector configuration
spring.ai.vectorstore.pgvector.dimension=1536
```

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:8080/api
```

## Git Repository
- **Remote**: https://github.com/rgaurava/jtv2.git
- **Branch**: main
- **Working Directory**: `/Users/rgaurava/jtv2/springai-b2b-platform`

## Branding & Company Info
- **Company**: Justransform (note: single word, lowercase 't')
- **Product**: SAIL (Spring AI Integration Layer)
- **Colors**: Cyan + Purple gradient theme
- **Logo**: Custom SVG in `/public/logos/`

## Future Roadmap / Potential Features
- EDI transaction processing (using IPWorks EDI)
- SFTP file exchange (using IPWorks SSH)
- Document encryption (using IPWorks OpenPGP)
- AI-powered transaction insights (using Spring AI + OpenAI)
- Vector-based transaction similarity search
- Groovy-based transformation rules
- Real-time notifications
- Advanced reporting/analytics
- Multi-company/tenant support

## Troubleshooting Common Issues

### Build Failures
1. **Lombok not generating code**: Check annotation processor configuration
2. **IPWorks not found**: Verify `~/.m2/repository/ipworks/` exists
3. **Java version mismatch**: Ensure `java -version` shows 24

### Runtime Issues
1. **Database connection failed**: Check PostgreSQL is running (`pg_isready`)
2. **CORS errors**: Verify `WebConfig.java` allows frontend origin
3. **JWT errors**: Check JWT secret in `application-local.properties`

### Frontend Issues
1. **API calls fail**: Verify backend is running on port 8080
2. **Blank page**: Check browser console for errors
3. **Theme not loading**: Verify logo files exist in `/public/logos/`

## Development Notes
- Use compact UI patterns (small padding, text sizes)
- Follow SAIL color scheme (cyan/purple)
- All new features should include AI insights where applicable
- Maintain PostgreSQL pgvector for future similarity searches
- Keep dependencies updated per official Spring AI docs

## Version History
- **v2025.0**: Current version
  - Java 24 upgrade
  - Spring Boot 3.4.1
  - Spring AI 1.0.3 stable
  - Compact UI redesign
  - IPWorks integration suite added
  - Groovy scripting support

## Quick Start After Conversation Break

When starting a new Claude Code session:

1. **Read this file** (`PROJECT.md`) to understand the full context
2. **Check running processes**: Backend (8080), Frontend (5173)
3. **Review recent commits**: `git log --oneline -10`
4. **Check for uncommitted changes**: `git status`
5. **Verify environment**:
   - Java 24: `java -version`
   - Node.js: `node -v`
   - PostgreSQL: `pg_isready`

## Important File References
- See `RESTORE.md` for disaster recovery procedures
- See `backup.sh` for automated backups
- See `pom.xml` backend/pom.xml:17 for current version
- See `tailwind.config.js` for SAIL theme colors
- See `src/types/index.ts` for TypeScript definitions

## Contact & Resources
- **Spring AI Docs**: https://docs.spring.io/spring-ai/reference/
- **IPWorks Docs**: Check `/Users/rgaurava/.nsoftware/` for documentation
- **Project Repo**: https://github.com/rgaurava/jtv2

---

**Last Updated**: 2025-01-02 (when Java 24 upgrade completed)
**Maintained By**: Development team with AI assistance
