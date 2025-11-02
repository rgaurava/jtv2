#!/bin/bash

echo "🛑 Stopping SpringAI B2B Platform..."
echo ""

# Stop Docker containers
echo "📦 Stopping PostgreSQL..."
docker-compose down

# Stop backend
echo "🔧 Stopping Spring Boot backend..."
pkill -f 'spring-boot:run' 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend stopped"
else
    echo "ℹ️  Backend was not running"
fi

# Stop frontend
echo "⚛️  Stopping React frontend..."
pkill -f 'vite' 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Frontend stopped"
else
    echo "ℹ️  Frontend was not running"
fi

echo ""
echo "✅ All services stopped!"
