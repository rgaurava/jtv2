# Changelog

All notable changes to the SAIL Platform project.

## [2025.0] - 2025-01-02

### Major Upgrades
- **Java 24**: Upgraded from Java 21 to Java 24
  - Required Lombok 1.18.40 for compatibility
  - Added explicit annotation processor configuration in Maven
- **Spring Boot 3.4.1**: Upgraded from 3.2.1 (latest stable)
- **Spring AI 1.0.3**: Upgraded from 1.0.0-M4 milestone to stable release
  - Breaking change: Updated artifact names
    - `spring-ai-openai-spring-boot-starter` → `spring-ai-starter-model-openai`
    - `spring-ai-pgvector-store-spring-boot-starter` → `spring-ai-starter-vector-store-pgvector`

### Added Dependencies
- **Apache Groovy 5.0.0**: For dynamic scripting and transformations
  - `groovy` - Core library
  - `groovy-json` - JSON processing
- **IPWorks 2025**: Commercial B2B integration suite
  - `ipworks` - Core networking
  - `ipworksedi` - EDI processing
  - `ipworksopenpgp` - PGP encryption
  - `ipworksssh` - SSH/SFTP
  - `ipworksencrypt` - Encryption utilities

### UI/UX Changes
- **Compact UI Design**: Complete redesign for maximum screen real estate
  - **Sidebar**: Reduced from w-64 to w-52
    - Logo: h-20 → h-8
    - Avatar: w-10 h-10 → w-7 h-7
    - Text: text-sm → text-xs
    - Icons: w-4 h-4 → w-3.5 h-3.5
    - Padding: p-6 → p-3
  - **MainPanel**: Reduced spacing throughout
    - Header: p-6 → p-3
    - Title: text-2xl → text-lg
    - Stats cards: p-4 → p-2
  - **TransactionCard**: Compact design
    - Padding: p-4 → p-2
    - ID font: text-xs → text-[10px]
    - Product name: text-lg → text-sm
    - Status badge: text-xs → text-[10px]
  - **DetailsPanel**: Reduced from w-96 to w-72
    - All padding reduced: p-4 → p-2
    - Labels: text-xs → text-[10px]
    - Values: text-sm → text-xs
  - **Login Page**: Updated to match compact design
    - Logo: h-20 → h-12
    - Title: text-3xl → text-xl
    - Spacing: space-y-8 → space-y-4
  - **Register Page**: Updated to match compact design
    - Same compact sizing as Login page
    - Grid gap: gap-4 → gap-3

### Documentation
- Added `RESTORE.md`: Comprehensive disaster recovery guide
- Added `backup.sh`: Automated backup script for database and config
- Added `PROJECT.md`: Complete project knowledge base and context
- Added `CHANGELOG.md`: This file

### Configuration Changes
- Added Maven compiler plugin with explicit Lombok annotation processor
- Removed Spring Milestones repository (no longer needed with stable Spring AI)
- Updated Lombok version to 1.18.40 in properties

### Bug Fixes
- Fixed Java 24 + Lombok compatibility with annotation processor configuration
- Fixed Spring AI dependency resolution with updated artifact names

## Previous Versions

### Initial Release
- Spring Boot 3.2.1
- Spring AI 1.0.0-M4 (milestone)
- Java 21
- React 19 frontend
- PostgreSQL with pgvector
- JWT authentication
- Transaction management system
- Dark/light theme support
- SAIL design system (Justransform branding)

## Notes
- IPWorks libraries are installed locally in `~/.m2/repository/ipworks/`
- All builds successful with Java 24
- Application fully functional with compact UI design
