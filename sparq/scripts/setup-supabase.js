#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and service role key are required.');
  console.error('Please add them to your .env file:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your-supabase-url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

// Initialize Supabase client with service role key for admin privileges
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up Supabase database...');

  try {
    // Create users table
    console.log('Creating users table...');
    const { error: usersError } = await supabase.rpc('create_users_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see their own data
        CREATE POLICY "Users can view and edit their own data" ON users
          FOR ALL
          USING (auth.uid() = id);
      `
    });

    if (usersError) throw usersError;

    // Create profiles table
    console.log('Creating profiles table...');
    const { error: profilesError } = await supabase.rpc('create_profiles_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          first_name TEXT,
          last_name TEXT,
          date_of_birth DATE,
          gender TEXT,
          location TEXT,
          bio TEXT,
          interests JSONB,
          looking_for TEXT,
          age_range_min INTEGER,
          age_range_max INTEGER,
          max_distance INTEGER,
          personality_data JSONB,
          ai_personality_prompt TEXT,
          red_flags JSONB,
          deal_breakers JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          CONSTRAINT unique_user_profile UNIQUE (user_id)
        );
        
        -- Enable RLS
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see their own profile
        CREATE POLICY "Users can view and edit their own profile" ON profiles
          FOR ALL
          USING (auth.uid() = user_id);
      `
    });

    if (profilesError) throw profilesError;

    // Create matches table
    console.log('Creating matches table...');
    const { error: matchesError } = await supabase.rpc('create_matches_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS matches (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id_1 UUID REFERENCES users(id) ON DELETE CASCADE,
          user_id_2 UUID REFERENCES users(id) ON DELETE CASCADE,
          match_score FLOAT,
          ai_match_reason TEXT,
          status TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          CONSTRAINT unique_match UNIQUE (user_id_1, user_id_2)
        );
        
        -- Enable RLS
        ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see their own matches
        CREATE POLICY "Users can view their own matches" ON matches
          FOR ALL
          USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);
      `
    });

    if (matchesError) throw matchesError;

    // Create conversations table
    console.log('Creating conversations table...');
    const { error: conversationsError } = await supabase.rpc('create_conversations_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS conversations (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          is_ai_conversation BOOLEAN DEFAULT TRUE,
          compatibility_score FLOAT,
          red_flags_detected JSONB,
          CONSTRAINT unique_conversation_match UNIQUE (match_id)
        );
        
        -- Enable RLS
        ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see their own conversations
        CREATE POLICY "Users can view their own conversations" ON conversations
          FOR ALL
          USING (
            EXISTS (
              SELECT 1 FROM matches
              WHERE matches.id = conversations.match_id
              AND (matches.user_id_1 = auth.uid() OR matches.user_id_2 = auth.uid())
            )
          );
      `
    });

    if (conversationsError) throw conversationsError;

    // Create messages table
    console.log('Creating messages table...');
    const { error: messagesError } = await supabase.rpc('create_messages_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS messages (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
          sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          is_ai_generated BOOLEAN DEFAULT FALSE,
          sentiment_score FLOAT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see messages in their conversations
        CREATE POLICY "Users can view messages in their conversations" ON messages
          FOR ALL
          USING (
            EXISTS (
              SELECT 1 FROM conversations
              JOIN matches ON matches.id = conversations.match_id
              WHERE conversations.id = messages.conversation_id
              AND (matches.user_id_1 = auth.uid() OR matches.user_id_2 = auth.uid())
            )
          );
      `
    });

    if (messagesError) throw messagesError;

    // Create ai_analysis table
    console.log('Creating ai_analysis table...');
    const { error: aiAnalysisError } = await supabase.rpc('create_ai_analysis_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS ai_analysis (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
          analysis_type TEXT,
          analysis_data JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for users to only see analysis of their conversations
        CREATE POLICY "Users can view analysis of their conversations" ON ai_analysis
          FOR ALL
          USING (
            EXISTS (
              SELECT 1 FROM conversations
              JOIN matches ON matches.id = conversations.match_id
              WHERE conversations.id = ai_analysis.conversation_id
              AND (matches.user_id_1 = auth.uid() OR matches.user_id_2 = auth.uid())
            )
          );
      `
    });

    if (aiAnalysisError) throw aiAnalysisError;

    console.log('✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase(); 