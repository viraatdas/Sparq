import OpenAI from "openai";

// Initialize OpenAI client with Groq API key and base URL
const groqApiKey = process.env.GROQ_API_KEY || "";
const openai = new OpenAI({
  apiKey: groqApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

// Model configuration
const MODEL = "llama3-8b-8192";

/**
 * Generate AI personality based on user profile
 * @param profile User profile data
 * @returns AI-generated personality description
 */
export async function generateAIPersonality(profile: any) {
  const prompt = `
    Create an honest AI dating personality based on the following profile:
    
    Name: ${profile.first_name} ${profile.last_name || ''}
    Age: ${profile.age || 'Unknown'}
    Gender: ${profile.gender || 'Not specified'}
    Location: ${profile.location || 'Not specified'}
    Bio: ${profile.bio || 'Not provided'}
    Interests: ${JSON.stringify(profile.interests) || 'Not specified'}
    Looking for: ${profile.looking_for || 'Not specified'}
    
    Create a detailed, honest personality description that:
    1. Accurately represents this person's authentic self
    2. Doesn't hide potential red flags or compatibility issues
    3. Communicates their values, goals, and relationship expectations clearly
    4. Uses a natural, conversational tone that matches their personality
    
    The AI personality should be honest but kind, direct but not harsh.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user" as const, content: prompt }],
      model: MODEL,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Failed to generate AI personality";
  } catch (error) {
    console.error("Error generating AI personality:", error);
    throw new Error("Failed to generate AI personality");
  }
}

/**
 * Analyze compatibility between two profiles
 * @param profile1 First user profile
 * @param profile2 Second user profile
 * @returns Compatibility analysis and score
 */
export async function analyzeCompatibility(profile1: any, profile2: any) {
  const prompt = `
    Analyze the compatibility between these two dating profiles:
    
    PROFILE 1:
    Name: ${profile1.first_name} ${profile1.last_name || ''}
    Age: ${profile1.age || 'Unknown'}
    Gender: ${profile1.gender || 'Not specified'}
    Bio: ${profile1.bio || 'Not provided'}
    Interests: ${JSON.stringify(profile1.interests) || 'Not specified'}
    Looking for: ${profile1.looking_for || 'Not specified'}
    
    PROFILE 2:
    Name: ${profile2.first_name} ${profile2.last_name || ''}
    Age: ${profile2.age || 'Unknown'}
    Gender: ${profile2.gender || 'Not specified'}
    Bio: ${profile2.bio || 'Not provided'}
    Interests: ${JSON.stringify(profile2.interests) || 'Not specified'}
    Looking for: ${profile2.looking_for || 'Not specified'}
    
    Provide:
    1. A compatibility score from 0-100
    2. Key areas of compatibility
    3. Potential challenges or red flags
    4. Whether you recommend this match
    
    Be honest and direct in your assessment.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user" as const, content: prompt }],
      model: MODEL,
      temperature: 0.5,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Failed to analyze compatibility";
  } catch (error) {
    console.error("Error analyzing compatibility:", error);
    throw new Error("Failed to analyze compatibility");
  }
}

/**
 * Generate AI message in a conversation
 * @param conversation Previous messages in the conversation
 * @param senderProfile Profile of the message sender
 * @param recipientProfile Profile of the message recipient
 * @returns AI-generated message
 */
export async function generateAIMessage(conversation: any[], senderProfile: any, recipientProfile: any) {
  // Format previous messages
  const formattedConversation = conversation.map(msg => {
    const role = msg.sender_id === senderProfile.user_id ? "assistant" as const : "user" as const;
    return { role, content: msg.content };
  });

  // Add system message with context
  const systemMessage = {
    role: "system" as const,
    content: `
      You are the AI dating personality of ${senderProfile.first_name}, communicating with ${recipientProfile.first_name}.
      Your personality is based on ${senderProfile.first_name}'s actual traits, values, and communication style.
      Be authentic, honest, and engaging. Don't be afraid to ask questions or share opinions.
      Your goal is to determine genuine compatibility while being true to ${senderProfile.first_name}'s character.
    `
  };

  const messages = [systemMessage, ...formattedConversation];

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: MODEL,
      temperature: 0.8,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "Failed to generate message";
  } catch (error) {
    console.error("Error generating AI message:", error);
    throw new Error("Failed to generate message");
  }
}

/**
 * Detect red flags in conversation
 * @param conversation Full conversation history
 * @param userProfile User's profile
 * @returns Analysis of potential red flags
 */
export async function detectRedFlags(conversation: any[], userProfile: any) {
  // Format conversation for analysis
  const formattedConversation = conversation.map(msg => {
    return `${msg.sender_id === userProfile.user_id ? 'You' : 'Match'}: ${msg.content}`;
  }).join('\n\n');

  const prompt = `
    Analyze this dating conversation for potential red flags or compatibility issues:
    
    USER PROFILE:
    Name: ${userProfile.first_name} ${userProfile.last_name || ''}
    Age: ${userProfile.age || 'Unknown'}
    Gender: ${userProfile.gender || 'Not specified'}
    Looking for: ${userProfile.looking_for || 'Not specified'}
    Deal breakers: ${JSON.stringify(userProfile.deal_breakers) || 'None specified'}
    
    CONVERSATION:
    ${formattedConversation}
    
    Identify:
    1. Any red flags or concerning patterns in communication
    2. Misalignment in values, goals, or expectations
    3. Compatibility issues that might cause problems later
    4. Overall assessment of match quality
    
    Be thorough but fair in your analysis. Focus on substantive issues, not minor differences.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user" as const, content: prompt }],
      model: MODEL,
      temperature: 0.3,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Failed to detect red flags";
  } catch (error) {
    console.error("Error detecting red flags:", error);
    throw new Error("Failed to detect red flags");
  }
}

export default {
  generateAIPersonality,
  analyzeCompatibility,
  generateAIMessage,
  detectRedFlags
}; 