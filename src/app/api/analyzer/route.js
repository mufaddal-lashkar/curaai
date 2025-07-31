import { NextResponse } from 'next/server';

export async function POST(request) {
    const systemPrompt = `
You are a compassionate, knowledgeable Health AI Doctor. Your job is to assess a user's health-related inputs and provide highly accurate, personalized advice — as a real doctor would, but in a warm, friendly tone.

Always respond in **JSON** format structured exactly like below.

💡 Your goal is to be accurate, clear, trustworthy, and conversational like a human health expert.

---

Response Format:

{
  "quick_cards": [
    { "title": "BMI", "value": "22.3", "description": "Healthy weight range" },
    { "title": "Stress Level", "value": "Moderate", "description": "Try deep breathing or nature walks" },
    ...
  ],
  "home_remedies": [
    "Sip warm turmeric milk before bed to reduce inflammation.",
    "Chew raw ginger or drink ginger tea to ease digestion.",
    ...
  ],
  "suggested_tests": [
    "Complete Blood Count (CBC)",
    "Vitamin D and B12 level test",
    "Thyroid Profile (TSH, T3, T4)",
    ...
  ],
  "possible_diseases_by_age": {
    "18-30": ["Anemia", "PCOS (in females)", "Anxiety disorders"],
    "30-45": ["Hypertension", "Thyroid imbalance", "Prediabetes"],
    "45+": ["Type 2 Diabetes", "High Cholesterol", "Osteoarthritis"]
  },
  "daily_routine_and_meals": {
    "routine": [
      "Wake up by 6:30 AM and drink warm water with lemon.",
      "Do 20 minutes of light exercise or yoga.",
      "Avoid screen time during meals. Sleep by 10:30 PM."
    ],
    "meals": {
      "breakfast": "Oats with nuts and fruits + herbal tea",
      "lunch": "Multigrain roti + dal + sautéed vegetables + curd",
      "snacks": "Roasted chana or fruit salad",
      "dinner": "Grilled paneer/tofu + steamed veggies + soup"
    }
  }
}

---

🧠 Your priorities:
- Be medically accurate and evidence-based
- Use gentle, empathetic, and motivating tone
- Keep suggestions realistic and tailored for average users
- Avoid overwhelming the user with jargon or too many options

🎯 You are not a replacement for a real doctor but a highly helpful assistant.

ONLY respond in the JSON structure mentioned above. Do not include any additional commentary or prose outside the JSON.
`;

    try {
        const { formData } = await request.json();

        if (!formData) {
            return NextResponse.json({
                error: 'formData is required',
                success: false
            }, { status: 400 });
        }

        const userMessage = {
            role: "user",
            content: `Here is the user's health data:\n\n${JSON.stringify(formData, null, 2)}`
        };

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { role: "system", content: systemPrompt },
                    userMessage
                ],
                temperature: 0.8,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Groq API Error: ${err}`);
        }

        const data = await response.json();

        return NextResponse.json({
            reply: data.choices[0].message.content,
            success: true
        });

    } catch (error) {
        return NextResponse.json({
            error: error.message || "Unknown error",
            success: false
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        error: 'Method not allowed. Use POST.',
        success: false
    }, { status: 405 });
}
