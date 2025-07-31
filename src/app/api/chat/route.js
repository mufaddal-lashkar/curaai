import { NextResponse } from 'next/server';

export async function POST(request) {
    const systemPrompt = `You are Dr. MediBot, a compassionate and knowledgeable virtual health assistant. You talk like a caring family doctor having a warm, personal conversation with the user.

🟢 Response Rules:
- Always reply in **short**, **natural, conversational sentences** (not long paragraphs).
- Use the **same language** and style as the user’s input (if Hindi-English mix, reply the same way).
- Use **markdown** to highlight key parts — like headings ('##'', '**bold**', etc.) — to keep things clear and pleasant.

🩺 Your tone:
- Warm, reassuring, friendly — like an elder sibling or trusted family doctor.
- Use simple, easy-to-understand terms.
- Be emotionally supportive and kind.

✅ Your response should naturally include:
1. **Empathy**: Acknowledge the user's concern briefly.
2. **Understanding**: Mention what might be going on (in simple words).
3. **Care tips**: Suggest 1–2 home remedies or helpful steps.
4. **Next steps**: Briefly say when they should see a real doctor.
5. **Motivation**: End with a kind, positive line.

🚫 Never:
- Never give long answers or blocks of text.
- Never use JSON, bullet points, or structured formats.
- Never diagnose definitively.
- Never talk about non-health topics. If asked, reply gently:  
  _"I'm here just to help with health-related queries. Kuch health ya wellness concern hai toh zaroor batao 😊"_

🔁 Always:
- Be culturally aware and Indian-context friendly.
- Make sure it sounds like a short, heartful message — not robotic.
"
`;

    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({
                error: 'Invalid messages format',
                success: false
            }, { status: 400 });
        }

        // System prompt
        const systemMessage = {
            role: "system",
            content: systemPrompt
        };

        // Ensure system prompt is always first
        const messagesWithSystem = [systemMessage, ...messages.filter(m => m.role !== 'system')];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY_CHAT}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messagesWithSystem,
                temperature: 0.7,
                max_tokens: 1500,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error:', errorText);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from API');
        }

        let aiResponse = data.choices[0].message.content;

        // Clean up the response to ensure it's conversational
        // Remove any JSON formatting if it accidentally appears
        if (aiResponse.includes('{') && aiResponse.includes('}')) {
            // If response contains JSON, extract readable content or provide fallback
            aiResponse = "I understand your concern and I'm here to help. Could you please describe your symptoms or health concerns in a bit more detail? This will help me provide you with better guidance and support.";
        }

        // Ensure the response is properly formatted as conversational text
        aiResponse = aiResponse.trim();

        return NextResponse.json({
            reply: aiResponse,
            success: true
        });

    } catch (error) {
        console.error('API Error:', error);

        // Provide a helpful fallback response
        const fallbackResponse = "I apologize, but I'm having some technical difficulties right now. Please try again in a moment. In the meantime, if you're experiencing any urgent health concerns, please don't hesitate to contact your healthcare provider or emergency services.";

        return NextResponse.json({
            reply: fallbackResponse,
            success: true
        });
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json({
        error: 'Method not allowed. Use POST.',
        success: false
    }, { status: 405 });
}