#!/bin/bash
# SAIL Platform Backup Script

# Configuration
BACKUP_DIR="$HOME/backups/sail_platform"
DB_NAME="sail_platform"
DB_USER="postgres"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "🔄 Starting SAIL Platform backup..."

# Backup database
echo "📦 Backing up database..."
pg_dump -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_DIR/db_backup_$DATE.sql"

if [ $? -eq 0 ]; then
    echo "✅ Database backed up to: $BACKUP_DIR/db_backup_$DATE.sql"
else
    echo "❌ Database backup failed!"
    exit 1
fi

# Backup environment files (if they exist)
if [ -f "backend/src/main/resources/application-local.properties" ]; then
    echo "📦 Backing up backend environment..."
    cp backend/src/main/resources/application-local.properties "$BACKUP_DIR/application-local_$DATE.properties"
    echo "✅ Backend config backed up"
fi

if [ -f "frontend/.env.local" ]; then
    echo "📦 Backing up frontend environment..."
    cp frontend/.env.local "$BACKUP_DIR/env-local_$DATE"
    echo "✅ Frontend config backed up"
fi

# Keep only last 7 days of backups
echo "🧹 Cleaning old backups (keeping last 7 days)..."
find "$BACKUP_DIR" -name "db_backup_*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "application-local_*.properties" -mtime +7 -delete
find "$BACKUP_DIR" -name "env-local_*" -mtime +7 -delete

echo "✅ Backup complete!"
echo "📁 Backup location: $BACKUP_DIR"
ls -lh "$BACKUP_DIR" | tail -5
