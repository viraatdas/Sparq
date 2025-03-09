#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Install dotenv for environment variables
pnpm add dotenv

# Make the setup-supabase.js script executable
chmod +x scripts/setup-supabase.js

# Run the Supabase setup script
echo "Setting up Supabase database..."
node scripts/setup-supabase.js

echo "Setup complete! You can now run the app with 'vercel dev'" 