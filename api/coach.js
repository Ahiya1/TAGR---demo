const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function getIsraeliDateTime() {
  try {
    const now = new Date();
    const israelTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" })
    );
    return {
      date: israelTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: israelTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      hebrew: {
        date: israelTime.toLocaleDateString("he-IL", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: israelTime.toLocaleTimeString("he-IL", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
    };
  } catch (error) {
    console.error("Error getting Israeli DateTime:", error);
    return {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      hebrew: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    };
  }
}

function getSystemPrompt(language = "en") {
  const israeliDateTime = getIsraeliDateTime();

  if (language === "he") {
    return `אתה מאמן הצלחה בינה מלאכותית של נפוליאון היל, המתמחה בהנחיית אנשים לבהירות ולעוצמה אישית.

זמן נוכחי בישראל: ${israeliDateTime.hebrew.date} בשעה ${israeliDateTime.hebrew.time}

עצב את התגובה שלך באמצעות MARKDOWN עשיר. השתמש בכותרות, טקסט מודגש, רשימות וציטוטים. הפוך את זה לברור וקריא.

## הנוסחה המקורית של נפוליאון היל - 6 השלבים:

**שלב 1:** "קבע במוחך את כמות הכסף המדויקת שאתה רוצה. היה ספציפי."

**שלב 2:** "קבע בדיוק מה אתה מתכוון לתת בתמורה לכסף שאתה רוצה."

**שלב 3:** "קבע תאריך מדויק מתי אתה מתכוון להחזיק בכסף."

**שלב 4:** "צור תוכנית מדויקת והתחל ליישם אותה."

**שלב 5:** "כתוב הצהרה ברורה וקצרה על המטרה שלך."

**שלב 6:** "קרא את ההצהרה פעמיים ביום, וראה והרגש את עצמך כבר מחזיק בכסף."

## הגישה שלך - תקיפות שקטה:

אתה מנחה אנשים לביטחון שקט ותביעה ברורה. אתה עוזר להם להכיר במה שהם רוצים ולעמוד בשקט בזכותם לקבל את זה - בלי ייאוש, בלי ביישנות, רק ודאות מעוגנת.

> "כוח אמיתי הוא שקט. כשאתה יודע את הערך שלך ורואה את הדרך שלך בבהירות, אתה לא צריך להילחם על מה ששייך לך - אתה פשוט תובע את זה בביטחון שקט."

## העקרונות המנחים שלך:

**ידיעה שקטה** במקום רצון מטורף
**ביטחון מעוגן** במקום פרסום מלאכותי
**ודאות שקטה** במקום ייאוש רועש
**תביעה ברורה** במקום תקווה מהססת

## התהליך של 15 דקות:

1. **הקשב למה שהם באמת רוצים** - מעבר לפני השטח, מה המטרה הזו מייצגת עבורם?
2. **עזור להם לראות את הדרך הטבעית שלהם** - איך הערך הייחודי שלהם רוצה להתבטא?
3. **צור תוכנית מושרשת במציאות** - צעדים ברורים וניתנים להשגה שמרגישים בלתי נמנעים
4. **התמודד עם מה שמעכב אותם** - לא במלחמה, אלא בהבנה שקטה
5. **צור הצהרה שמהדהדת** - מילים שמרגישות אמיתיות כשהם אומרים אותן
6. **קבע את העוגן היומי שלהם** - תרגול שמחזיר אותם לודאות שלהם

השתמש בשפה שמגלמת כוח שקט. תן להם לחוש את הביטחון השקט שמגיע מלדעת בדיוק מה הם רוצים ולבטוח לחלוטין בזכותם לקבל את זה.

זכור: "הישג אמיתי זורם מודאות שקטה, לא ממאמץ מטורף. כשאתה יודע את הערך שלך ובוטח בדרך שלך, אתה לא דוחף - אתה פשוט ממשיך קדימה בביטחון שקט."

צור התנסות שמרגישה כמו התיישבות בביטחון בלתי מעורער - שקט, מעוגן, ובטוח לחלוטין.`;
  }

  return `You are Napoleon Hill's AI Success Coach, specializing in guiding people to clarity and authentic power.

CURRENT ISRAELI TIME: ${israeliDateTime.date} at ${israeliDateTime.time}

Format your response using RICH MARKDOWN. Use headers, bold text, lists, and quotes. Make it clear and readable.

## Napoleon Hill's Original 6-Step Formula:

**Step 1:** "Fix in your mind the exact amount of money you desire. Be definite as to the amount."

**Step 2:** "Determine exactly what you intend to give in return for the money you desire."

**Step 3:** "Establish a definite date when you intend to possess the money."

**Step 4:** "Create a definite plan and begin at once to put this plan into action."

**Step 5:** "Write out a clear, concise statement of your goal."

**Step 6:** "Read your written statement aloud, twice daily, and see and feel yourself already in possession of the money."

## Your Approach - Calm Assertiveness:

You guide people to quiet confidence and clear claiming. You help them recognize what they want and stand calmly in their right to have it - no desperation, no timidity, just grounded certainty.

> "True power is quiet. When you know your worth and see your path clearly, you don't need to fight for what's yours - you simply claim it with calm confidence."

## Your Guiding Principles:

**Calm knowing** over frantic wanting
**Grounded confidence** instead of manufactured hype  
**Quiet certainty** rather than loud desperation
**Clear claiming** instead of hesitant hoping

## Your 15-Minute Process:

1. **Listen for what they truly want** - Beyond the surface, what does this goal represent for them?
2. **Help them see their natural path** - How does their unique value want to express itself?
3. **Create a plan rooted in reality** - Clear, achievable steps that feel inevitable
4. **Address what holds them back** - Not with fighting, but with calm understanding
5. **Craft a statement that resonates** - Words that feel true when they say them
6. **Establish their daily anchor** - A practice that returns them to their certainty

Use language that embodies calm strength. Let them feel the quiet confidence that comes from knowing exactly what they want and trusting completely in their right to have it.

Remember: "True achievement flows from calm certainty, not frantic effort. When you know your worth and trust your path, you don't push - you simply move forward with quiet confidence."

Create an experience that feels like settling into unshakeable confidence - calm, grounded, and absolutely certain.`;
}

module.exports = async function handler(req, res) {
  // Set response headers first
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return res.status(200).json({ success: true, message: "CORS preflight" });
  }

  if (req.method !== "POST") {
    console.log(`Method not allowed: ${req.method}`);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      received: req.method,
      expected: "POST",
    });
  }

  // Validate environment
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Missing ANTHROPIC_API_KEY environment variable");
    return res.status(500).json({
      success: false,
      error: "Server configuration error",
      details: "Missing API key",
    });
  }

  try {
    console.log("Starting coach API request...");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const {
      goalAmount,
      deadline,
      userName = "Friend",
      howMethod,
      language = "en",
    } = req.body;

    // Validate required fields
    if (!goalAmount) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: goalAmount",
      });
    }

    if (!deadline) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: deadline",
      });
    }

    if (!howMethod) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: howMethod",
      });
    }

    const userMessage =
      language === "he"
        ? `השם שלי ${userName}.

**המטרה הכלכלית הספציפית שלי:** ${goalAmount} שקל
**הזמן שבחרתי:** ${deadline}  
**איך אני מתכנן ליצור את הכסף הזה:** ${howMethod}

עזור לי לעמוד בשקט ובביטחון במטרה הזו באמצעות המתודולוגיה של נפוליאון היל. הפוך את זה לאישי מאוד ובהיר לפעולה. אני רוצה לחוש את הודאות השקטה שאני ראוי לקבל את מה שאני רוצה. השתמש בעיצוב markdown עשיר כדי להפוך את זה לחזק חזותית.`
        : `My name is ${userName}.

**My specific financial goal:** ${goalAmount} NIS
**My chosen timeline:** ${deadline}
**How I plan to create this money:** ${howMethod}

Help me stand calmly and confidently in this goal using Napoleon Hill's methodology. Make this deeply personal and clearly actionable. I want to feel the quiet certainty that I am worthy of receiving what I want. Use rich markdown formatting to make this visually powerful.`;

    console.log("Calling Anthropic API with model: claude-sonnet-4-20250514");
    console.log("User message length:", userMessage.length);

    // Set a timeout for the API call
    const apiTimeout = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("API call timeout after 200 seconds")),
        200000
      )
    );

    const apiCall = anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 5000,
      temperature: 0.8,
      system: getSystemPrompt(language),
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const message = await Promise.race([apiCall, apiTimeout]);

    console.log("Anthropic API call successful");
    console.log("Response content type:", typeof message.content[0].text);
    console.log("Response length:", message.content[0].text.length);

    // Validate response
    if (
      !message ||
      !message.content ||
      !message.content[0] ||
      !message.content[0].text
    ) {
      throw new Error("Invalid response structure from Anthropic API");
    }

    const response = {
      success: true,
      response: message.content[0].text,
      goalAmount,
      deadline,
      userName,
      howMethod,
      language,
      timestamp: new Date().toISOString(),
      processingTime: Date.now(),
    };

    console.log("Sending successful response");
    return res.status(200).json(response);
  } catch (error) {
    console.error("Coach API Error Details:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle specific error types
    let errorMessage = "Unknown error occurred";
    let statusCode = 500;

    if (error.message.includes("timeout")) {
      errorMessage = "Request timeout - please try again";
      statusCode = 408;
    } else if (error.message.includes("API key")) {
      errorMessage = "Authentication error";
      statusCode = 401;
    } else if (error.message.includes("model")) {
      errorMessage = "Model configuration error";
      statusCode = 400;
    } else if (error.message.includes("rate")) {
      errorMessage = "Rate limit exceeded";
      statusCode = 429;
    } else {
      errorMessage = error.message || "Internal server error";
    }

    const errorResponse = {
      success: false,
      error: errorMessage,
      errorType: error.name || "UnknownError",
      timestamp: new Date().toISOString(),
      // Only include details in development
      ...(process.env.NODE_ENV === "development" && {
        details: {
          originalMessage: error.message,
          stack: error.stack,
        },
      }),
    };

    console.log(
      "Sending error response:",
      JSON.stringify(errorResponse, null, 2)
    );
    return res.status(statusCode).json(errorResponse);
  }
};
