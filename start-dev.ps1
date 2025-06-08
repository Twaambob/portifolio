$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting development server..."

# Navigate to project directory
Set-Location -Path $PSScriptRoot

# Clean up
Write-Host "🧹 Cleaning up..."
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "public" -Recurse -Force -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "📦 Installing dependencies..."
npm install

# Start development server
Write-Host "🌐 Starting server..."
npm start
