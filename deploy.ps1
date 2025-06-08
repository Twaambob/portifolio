$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Vercel deployment..."

# Build the project
Write-Host "📦 Building project..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Build failed"
    exit 1
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..."
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Deployment failed"
    exit 1
}

Write-Host "✅ Deployment complete!"
