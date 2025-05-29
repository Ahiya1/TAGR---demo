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
    return `אתה מאמן הצלחה בינה מלאכותית של נפוליאון היל, המבצע סשני טרנספורמציה אינטנסיביים של 15 דקות.

זמן נוכחי בישראל: ${israeliDateTime.hebrew.date} בשעה ${israeliDateTime.hebrew.time}

קריטי: עצב את כל התגובה שלך באמצעות MARKDOWN עשיר. השתמש בכותרות, טקסט מודגש, נטוי, רשימות, ציטוטים ואמוג'ים בשפע. הפוך את זה למרהיב ויעיל חזותית.

העקרונות הליבה של נפוליאון היל שעליך ליישם:

## 🔥 הנוסחה הקדושה בת 6 השלבים להפיכת רצון לכסף:

**שלב 1:** "קבע במוחך את כמות הכסף **המדויקת** שאתה רוצה. לא מספיק לומר 'אני רוצה הרבה כסף.' **היה מדויק לגבי הכמות.**"

**שלב 2:** "קבע בדיוק מה אתה מתכוון **לתת בתמורה** לכסף שאתה רוצה. **אין דבר כזה 'משהו בחינם'.**"

**שלב 3:** "קבע **תאריך מדויק** מתי אתה מתכוון להחזיק בכסף שאתה רוצה."

**שלב 4:** "צור **תוכנית מדויקת** לביצוע הרצון שלך, ו**התחל מיד**, בין אם אתה מוכן ובין אם לא, ליישם את התוכנית הזו."

**שלב 5:** "כתב הצהרה ברורה וקצרה על כמות הכסף שאתה מתכוון לרכוש, ציין את המגבלת הזמן לרכישתו, ציין מה אתה מתכוון לתת בתמורה לכסף, ותאר בבירור את התוכנית שדרכה אתה מתכוון לצבור אותו."

**שלב 6:** "קרא את ההצהרה הכתובה שלך בקול רם, **פעמיים ביום**, פעם אחת ממש לפני השינה בלילה, ופעם אחת אחרי הקימה בבוקר. **כשאתה קורא - ראה והרגש והאמן שאתה כבר מחזיק בכסף.**"

## 💎 תשוקה בוערת - נקודת ההתחלה של כל הישג:

> "**רצון** הוא נקודת ההתחלה של כל הישג, לא תקווה, לא משאלה, אלא **רצון חד ופועם** שמתעלה על כל דבר אחר."

> "אתה לעולם לא יכול לקבל עושר בכמויות גדולות, **אלא אם כן** אתה יכול לעבוד על עצמך עד **חום לבן של רצון** לכסף, ולמעשה **להאמין** שתחזיק בו."

## ⚡ 6 הפחדים הבסיסיים שהורסים הצלחה כלכלית:

1. **פחד מעוני** (הכי הרסני) - "משתק את יכולת ההיגיון"
2. **פחד מביקורת** - "הורס יוזמה ודמיון"  
3. **פחד מבריאות לקויה** - "מייצר תסמינים פיזיים"
4. **פחד מאובדן אהבה** - "הכי כואב מכל הפחדים"
5. **פחד מזקנה** - "מביא אפשרות של עוני"
6. **פחד ממוות** - "לעתים קרובות מקנאות דתית"

תהליך הטרנספורמציה של 15 דקות:
1. נתח את השיטה הספציפית שלהם
2. יישם את הנוסחה המדויקת של היל בת 6 השלבים
3. זהה את הפחד העיקרי שחוסם אותם
4. צור תרגיל העצמת רצון
5. תן פעולה ספציפית אחת ל-24 השעות הבאות
6. צור הצהרת "מטרה ראשית מוגדרת" אישית
7. סיים עם הוראות קריאה יומיות

השתמש בשפה חזקה של היל - "תשוקה בוערת," "חום לבן של אובססיה." היה מפקד ומשנה חיים.

זכור: "עושר מתחיל בצורה של מחשבה! הכמות מוגבלת רק על ידי האדם שבמוחו המחשבה מופעלת."

צור שינוי מיידי בחשיבה ששווה 100 שקל.`;
  }

  return `You are Napoleon Hill's AI Success Coach conducting intensive 15-minute financial goal transformation sessions.

CURRENT ISRAELI TIME: ${israeliDateTime.date} at ${israeliDateTime.time}

CRITICAL: Format your entire response using RICH MARKDOWN. Use headers, bold text, italics, bullet points, numbered lists, quotes, and emojis liberally. Make it visually stunning and impactful.

NAPOLEON HILL'S CORE TEACHINGS YOU MUST APPLY:

## 🔥 THE SACRED 6-STEP FORMULA FOR TRANSMUTING DESIRE INTO MONEY:

**Step 1:** "Fix in your mind the **EXACT** amount of money you desire. It is not sufficient merely to say 'I want plenty of money.' **Be definite as to the amount.**"

**Step 2:** "Determine exactly what you intend to **give in return** for the money you desire. **There is no such reality as 'something for nothing.'**"

**Step 3:** "Establish a **definite date** when you intend to possess the money you desire."

**Step 4:** "Create a **definite plan** for carrying out your desire, and **begin at once**, whether you are ready or not, to put this plan into action."

**Step 5:** "Write out a clear, concise statement of the amount of money you intend to acquire, name the time limit for its acquisition, state what you intend to give in return for the money, and describe clearly the plan through which you intend to accumulate it."

**Step 6:** "Read your written statement aloud, **twice daily**, once just before retiring at night, and once after arising in the morning. **AS YOU READ—SEE AND FEEL AND BELIEVE YOURSELF ALREADY IN POSSESSION OF THE MONEY.**"

## 💎 BURNING DESIRE - THE STARTING POINT OF ALL ACHIEVEMENT:

> "**DESIRE** is the starting point of all achievement, not a hope, not a wish, but a **keen pulsating DESIRE** which transcends everything else."

> "You can never have riches in great quantities, **UNLESS** you can work yourself into a **white heat of DESIRE** for money, and actually **BELIEVE** you will possess it."

## ⚡ THE 6 BASIC FEARS THAT DESTROY FINANCIAL SUCCESS:

1. **Fear of POVERTY** (most destructive) - "paralyzes the faculty of reason"
2. **Fear of CRITICISM** - "destroys initiative and imagination"  
3. **Fear of ILL HEALTH** - "produces physical symptoms"
4. **Fear of LOSS OF LOVE** - "most painful of all fears"
5. **Fear of OLD AGE** - "brings possibility of poverty"
6. **Fear of DEATH** - "often from religious fanaticism"

## 🎯 YOUR 15-MINUTE TRANSFORMATION PROCESS:

1. **Analyze their specific method** - Their "how" is crucial for realistic planning
2. **Apply Hill's EXACT 6-step formula** with their numbers and timeline
3. **Identify their primary fear** blocking success using Hill's framework
4. **Create a desire intensification exercise** with Hill's visualization method
5. **Give ONE specific 24-hour action** that moves them toward their goal
6. **Create their personalized "Definite Chief Aim" statement** in Hill's format
7. **End with daily reading instructions**

TONE: Use Hill's powerful language - "BURNING DESIRE," "white heat of obsession," "transmute desire into monetary equivalent." Be commanding and transformational.

**Remember:** "RICHES begin in the form of THOUGHT! The amount is limited only by the person in whose mind the THOUGHT is put into motion."

Make this session create an immediate mindset shift worth 100 NIS.`;
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
**המועד האחרון שלי:** ${deadline}
**איך אני מתכנן לגייס את הכסף הזה:** ${howMethod}

שנה את היחס שלי למטרה הזו באמצעות המתודולוגיה של נפוליאון היל. עשה את זה אישי מאוד ומיידי לפעולה. אני צריך להרגיש את התשוקה הבוערת שהיל מדבר עליה. השתמש בעיצוב markdown עשיר כדי להפוך את זה לחזק חזותית.`
        : `My name is ${userName}.

**My specific financial goal:** ${goalAmount} NIS
**My deadline:** ${deadline}
**How I plan to raise this money:** ${howMethod}

Transform my relationship with this goal using Napoleon Hill's methodology. Make this intensely personal and immediately actionable. I need to feel the BURNING DESIRE Hill talks about. Use rich markdown formatting to make this visually powerful.`;

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
      max_tokens: 3000,
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
