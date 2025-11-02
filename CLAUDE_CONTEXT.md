# Claude Code - Quick Context

> **READ THIS FIRST** when starting a new conversation about this project!

## Current Status ✅
- **Version**: 2025.0
- **State**: Fully functional, all upgrades complete
- **Last Updated**: 2025-01-02

## Tech Stack (Exact Versions)
```
Backend:
- Java 24 (JDK at /Library/Java/JavaVirtualMachines/jdk-24.jdk/Contents/Home)
- Spring Boot 3.4.1
- Spring AI 1.0.3 (stable)
- Lombok 1.18.40 (with explicit annotation processor)
- PostgreSQL + pgvector
- Apache Groovy 5.0.0
- IPWorks 2025 suite (locally installed in ~/.m2)

Frontend:
- React 19
- Vite 6
- TypeScript
- TailwindCSS (SAIL theme)
```

## Project Identity
- **Company**: Justransform (one word, lowercase 't')
- **Product**: SAIL Platform (Spring AI Integration Layer)
- **Purpose**: AI-powered B2B transaction management
- **Design**: Compact UI with cyan/purple gradient theme

## Critical Knowledge

### 1. Compact UI Design Standard
ALL UI components use reduced spacing for maximum screen real estate:
- Padding: p-2, p-3 (not p-4, p-6)
- Text sizes: text-xs, text-sm, text-[10px] (not text-base, text-lg)
- Sidebar: w-52 (not w-64)
- Details panel: w-72 (not w-96)
- Logo: h-8 or h-12 (not h-20)

### 2. Java 24 + Lombok Requirement
**MUST** have this in pom.xml or Lombok breaks:
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

### 3. Spring AI Breaking Changes
Version 1.0.3 uses NEW artifact names:
- ✅ `spring-ai-starter-model-openai`
- ✅ `spring-ai-starter-vector-store-pgvector`
- ❌ OLD: `spring-ai-openai-spring-boot-starter` (won't work)

### 4. IPWorks Libraries
- Locally installed in `~/.m2/repository/ipworks/`
- Version: 2025
- Includes: EDI, SSH/SFTP, OpenPGP, Encryption
- Purpose: Future B2B integrations (EDI processing, file transfers)

## Project Structure
```
/Users/rgaurava/jtv2/springai-b2b-platform/
├── backend/          # Spring Boot (port 8080)
├── frontend/         # React + Vite (port 5173)
├── PROJECT.md        # Complete project documentation
├── RESTORE.md        # Disaster recovery guide
├── CHANGELOG.md      # Version history
├── backup.sh         # Automated backup script
└── CLAUDE_CONTEXT.md # This file
```

## Common Commands
```bash
# Start backend
cd backend && mvn spring-boot:run

# Start frontend
cd frontend && npm run dev

# Build backend
cd backend && mvn clean install

# Backup database
./backup.sh

# Check status
git status
git log --oneline -5
```

## What User Expects
1. **Conversation Continuity**: Remember all previous decisions and context
2. **Compact UI Standard**: Always use reduced spacing/sizes
3. **Latest Technologies**: Keep Spring Boot/AI updated per official docs
4. **Quick Recovery**: Ability to restore environment after crashes

## Recent Conversation Topics
1. ✅ Compact UI redesign (all components updated)
2. ✅ Spring Boot/AI upgrade to latest stable
3. ✅ Java 24 upgrade with Lombok compatibility
4. ✅ Added Groovy + IPWorks dependencies
5. ✅ Created disaster recovery documentation

## What NOT to Do
- ❌ Don't increase padding/spacing (keep compact)
- ❌ Don't downgrade Java version
- ❌ Don't use old Spring AI artifact names
- ❌ Don't forget annotation processor config for Lombok
- ❌ Don't change "Justransform" branding (single word)

## Git Repository
- **Remote**: https://github.com/rgaurava/jtv2.git
- **Branch**: main
- **All changes committed and pushed**: ✅

## Key Files to Reference
1. **PROJECT.md**: Complete technical documentation
2. **RESTORE.md**: Environment restoration steps
3. **pom.xml** (backend/pom.xml:17): Current version and dependencies
4. **tailwind.config.js**: SAIL theme colors
5. **src/types/index.ts**: TypeScript definitions

## Quick Sanity Checks
```bash
# Verify Java version
java -version  # Should show 24

# Verify backend dependencies
cd backend && mvn dependency:tree | grep spring-ai
# Should show version 1.0.3

# Verify frontend is up
curl http://localhost:5173  # Should return HTML

# Verify backend is up
curl http://localhost:8080/api/transactions  # Should return JSON
```

## Next Steps (If Any)
- No pending tasks currently
- Application is production-ready
- User may request:
  - New features (EDI processing, AI insights)
  - Additional UI refinements
  - Integration work
  - Performance optimizations

---

**Remember**: Always read PROJECT.md for comprehensive details. This file is just a quick-start guide!
