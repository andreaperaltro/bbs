#!/bin/sh
# Kill any process using port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null
# Start Next.js dev server on port 3000
npm run dev:hot 