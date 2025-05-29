// FILE: api/index.js (New serverless function)
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function getIsraeliDateTime() {
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

  // English version (existing)
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

// In-memory storage for reviews (since Vercel is serverless)
let reviews = [
  {
    id: 1,
    userName: "Sarah M.",
    rating: 5,
    comment:
      "This transformed my entire mindset about money! The AI coach felt like having Napoleon Hill himself guide me.",
    language: "en",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    userName: "David L.",
    rating: 5,
    comment:
      "Incredibly powerful session. I finally have a clear, actionable plan to reach my financial goal.",
    language: "en",
    date: new Date().toISOString(),
  },
];

// API Routes
app.post("/api/coach", async (req, res) => {
  try {
    const {
      goalAmount,
      deadline,
      userName = "Friend",
      howMethod,
      language = "en",
    } = req.body;

    const userMessage =
      language === "he"
        ? `השם שלי ${userName}.

**המטרה הכלכלית הספציפית שלי:** ${goalAmount} שקל
**המועד האחרון שלי:** ${deadline}
**איך אני מתכנן לגייס את הכסף הזה:** ${howMethod}

שנה את היחס שלי למטרה הזו באמצעות המתודולוgiה של נפוליאון היל. עשה את זה אישי מאוד ומיידי לפעולה. אני צריך להרגיש את התשוקה הבוערת שהיל מדבר עליה. השתמש בעיצוב markdown עשיר כדי להפוך את זה לחזק חזותית.`
        : `My name is ${userName}.

**My specific financial goal:** ${goalAmount} NIS
**My deadline:** ${deadline}
**How I plan to raise this money:** ${howMethod}

Transform my relationship with this goal using Napoleon Hill's methodology. Make this intensely personal and immediately actionable. I need to feel the BURNING DESIRE Hill talks about. Use rich markdown formatting to make this visually powerful.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2500,
      temperature: 0.8,
      system: getSystemPrompt(language),
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    res.json({
      success: true,
      response: message.content[0].text,
      goalAmount,
      deadline,
      userName,
      howMethod,
      language,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

// Email sending
app.post("/api/send-email", async (req, res) => {
  try {
    const { email, content, userName, language } = req.body;

    const subject =
      language === "he"
        ? `תוכנית ההצלחה האישית שלך - ${userName}`
        : `Your Personal Success Plan - ${userName}`;

    const htmlContent = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 30px;">
            <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h1 style="color: #e74c3c; text-align: center; margin-bottom: 30px;">
                    ${
                      language === "he"
                        ? "🔥 תוכנית ההצלחה האישית שלך"
                        : "🔥 Your Personal Success Plan"
                    }
                </h1>
                <div style="border: 3px solid #3498db; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                    ${content}
                </div>
                <div style="background: linear-gradient(45deg, #f39c12, #e67e22); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                    <p style="margin: 0; font-size: 1.1rem;">
                        ${
                          language === "he"
                            ? 'זכור: "עושר מתחיל בצורה של מחשבה!" - נפוליאון היל'
                            : 'Remember: "RICHES begin in the form of THOUGHT!" - Napoleon Hill'
                        }
                    </p>
                </div>
            </div>
        </div>`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Reviews (in-memory storage for serverless)
app.post("/api/review", async (req, res) => {
  try {
    const { userName, rating, comment, language } = req.body;

    const newReview = {
      id: Date.now(),
      userName,
      rating,
      comment,
      language,
      date: new Date().toISOString(),
    };

    reviews.unshift(newReview);
    reviews = reviews.slice(0, 50); // Keep only last 50 reviews

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    res.json(reviews.slice(0, 10)); // Return top 10 reviews
  } catch (error) {
    res.json([]);
  }
});

// Serve the main HTML file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export for Vercel
module.exports = app;
