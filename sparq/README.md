# Sparq - AI-Powered Dating App

Sparq is an innovative dating app that uses AI to create honest dating personalities, detect red flags early, and find genuine connections.

## Key Features

- **AI Dating Personality**: Create an honest AI representation of yourself that communicates with potential matches
- **Red Flag Detection**: AI identifies compatibility issues and red flags before you waste months discovering them
- **Honesty Protection**: No more games or false personas - AI ensures authentic representation
- **AI-Driven Conversations**: Your AI personality chats with potential matches, revealing true compatibility
- **Compatibility Assessment**: Advanced algorithms determine real-life compatibility

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, Supabase
- **Authentication**: NextAuth.js with Instagram OAuth
- **AI**: Groq API with Llama3-8b model
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Instagram OAuth credentials
- Groq API key

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/sparq.git
cd sparq
```

### Step 2: Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# NextAuth configuration
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
INSTAGRAM_CLIENT_ID="your-instagram-client-id"
INSTAGRAM_CLIENT_SECRET="your-instagram-client-secret"

# Groq API
GROQ_API_KEY="your-groq-api-key"
```

### Step 3: Run the setup script

```bash
./scripts/setup.sh
```

This will:
- Install all dependencies
- Set up the Supabase database tables
- Configure the necessary permissions

### Step 4: Start the development server

```bash
vercel dev
```

The app will be available at http://localhost:3000

## OAuth Configuration

### Instagram OAuth

1. Go to the [Meta for Developers](https://developers.facebook.com/)
2. Create a new app
3. Add the Instagram Basic Display product
4. Configure your app settings
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/instagram`
   - `https://your-production-domain.com/api/auth/callback/instagram`

## Database Schema

The app uses the following Supabase tables:

- **users**: Core user information
- **profiles**: Detailed user profiles and personality data
- **matches**: Connections between users
- **conversations**: Chat conversations between matched users
- **messages**: Individual messages in conversations
- **ai_analysis**: AI analysis of conversations and compatibility

## AI Features

### AI Personality Generation

The app uses the Groq API with Llama3-8b to generate honest AI personalities based on user profiles.

### Compatibility Analysis

AI analyzes profiles and conversations to determine compatibility and detect potential red flags.

### AI-Driven Conversations

AI personalities chat with each other to establish baseline compatibility before users connect directly.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 