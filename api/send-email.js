const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  // Handle CORS
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

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { email, content, userName, language } = req.body;

    const isHebrew = language === "he";
    const direction = isHebrew ? "rtl" : "ltr";

    const subject = isHebrew
      ? `תוכנית הצלחתך האישית - ${userName}`
      : `Your Success Blueprint - ${userName}`;

    const greeting = isHebrew ? `שלום ${userName},` : `Hello ${userName},`;

    const intro = isHebrew
      ? "הנה תוכנית ההצלחה האישית שלך - תזכורת יומית לכוח השקט שיש בך ולמה שאתה ראוי לקבל."
      : "Here's your personal success blueprint - a daily reminder of the quiet power within you and what you're worthy of receiving.";

    const readingInstructions = isHebrew
      ? "קרא את זה פעמיים ביום, לא כתרגיל נואש אלא כחזרה רגועה למה שאתה בוחר ליצור."
      : "Read this twice daily, not as a desperate exercise but as a calm return to what you're choosing to create.";

    const quote = isHebrew
      ? '"כוח אמיתי הוא שקט. כשאתה יודע את הערך שלך, אתה פשוט תובע מה שאתה רוצה בביטחון שקט."'
      : '"True power is quiet. When you know your worth, you simply claim what you want with calm confidence."';

    const collaborationTitle = isHebrew
      ? "רוצה לשתף או לשתף פעולה?"
      : "Want to Review or Collaborate?";

    const collaborationText = isHebrew
      ? "אם תוכנית ההצלחה הזו נגעה בך, או אם יש לך תובנות לשיפור - נשמח לשמוע ממך. החוכמה הטובה ביותר נוצרת כשאנשים חולקים את מה שהם לומדים."
      : "If this success blueprint resonated with you, or if you have insights for improvement - we'd love to hear from you. The best wisdom emerges when people share what they're learning.";

    const replyPrompt = isHebrew
      ? "פשוט הגב למייל הזה - נקרא כל מילה."
      : "Simply reply to this email - we read every word.";

    const signature = isHebrew ? "בודאות שקטה," : "With calm certainty,";

    const teamName = isHebrew
      ? "צוות נפוליאון היל בינה מלאכותית"
      : "The Napoleon Hill AI Team";

    const htmlContent = `
        <!DOCTYPE html>
        <html dir="${direction}" lang="${isHebrew ? "he" : "en"}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body style="
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%);
            min-height: 100vh;
            direction: ${direction};
        ">
            <div style="max-width: 650px; margin: 0 auto; padding: 40px 20px;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="
                        font-family: 'Crimson Text', serif;
                        font-size: 2.5rem;
                        font-weight: 600;
                        margin: 0 0 20px 0;
                        background: linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #ec4899 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        line-height: 1.2;
                    ">
                        ✨ ${
                          isHebrew ? "תוכנית הצלחתך" : "Your Success Blueprint"
                        }
                    </h1>
                </div>

                <!-- Main Card -->
                <div style="
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 24px;
                    padding: 50px 40px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                    position: relative;
                    overflow: hidden;
                ">
                    <!-- Top border -->
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    "></div>

                    <!-- Greeting -->
                    <div style="margin-bottom: 30px;">
                        <p style="
                            font-size: 1.125rem;
                            color: #404040;
                            margin: 0 0 15px 0;
                            font-weight: 500;
                        ">${greeting}</p>
                        
                        <p style="
                            font-size: 1rem;
                            color: #737373;
                            margin: 0;
                            line-height: 1.6;
                        ">${intro}</p>
                    </div>

                    <!-- Content -->
                    <div style="
                        border: 2px solid #e5e5e5;
                        padding: 30px;
                        border-radius: 16px;
                        margin-bottom: 40px;
                        background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                    ">
                        ${content}
                    </div>

                    <!-- Reading Instructions -->
                    <div style="
                        background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
                        border-left: 4px solid #f59e0b;
                        padding: 25px;
                        border-radius: 12px;
                        margin-bottom: 40px;
                        ${
                          isHebrew
                            ? "border-left: none; border-right: 4px solid #f59e0b;"
                            : ""
                        }
                    ">
                        <p style="
                            margin: 0;
                            font-size: 1rem;
                            color: #525252;
                            font-style: italic;
                            line-height: 1.6;
                        ">${readingInstructions}</p>
                    </div>

                    <!-- Quote -->
                    <div style="
                        text-align: center;
                        padding: 30px 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 16px;
                        margin-bottom: 40px;
                    ">
                        <p style="
                            margin: 0;
                            font-size: 1.125rem;
                            color: white;
                            font-style: italic;
                            line-height: 1.6;
                            font-family: 'Crimson Text', serif;
                        ">${quote}</p>
                    </div>

                    <!-- Collaboration Section -->
                    <div style="
                        border-top: 2px solid #e5e5e5;
                        padding-top: 30px;
                        text-align: center;
                    ">
                        <h3 style="
                            font-size: 1.25rem;
                            color: #404040;
                            margin: 0 0 15px 0;
                            font-weight: 600;
                        ">${collaborationTitle}</h3>
                        
                        <p style="
                            font-size: 1rem;
                            color: #737373;
                            margin: 0 0 20px 0;
                            line-height: 1.6;
                        ">${collaborationText}</p>
                        
                        <p style="
                            font-size: 0.9rem;
                            color: #a3a3a3;
                            margin: 0 0 30px 0;
                            font-style: italic;
                        ">${replyPrompt}</p>

                        <!-- CTA Button -->
                        <div style="
                            display: inline-block;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            padding: 15px 30px;
                            border-radius: 50px;
                            text-decoration: none;
                            color: white;
                            font-weight: 600;
                            font-size: 1rem;
                            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                        ">
                            💌 ${
                              isHebrew
                                ? "שתף את התובנות שלך"
                                : "Share Your Insights"
                            }
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; color: rgba(255, 255, 255, 0.7);">
                    <p style="margin: 0 0 10px 0; font-size: 1rem;">${signature}</p>
                    <p style="margin: 0 0 20px 0; font-size: 0.9rem; font-weight: 500;">${teamName}</p>
                    
                    <!-- P.S. Section -->
                    <div style="
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 20px;
                        margin-top: 20px;
                        text-align: ${isHebrew ? "right" : "left"};
                    ">
                        <p style="
                            margin: 0;
                            font-size: 0.9rem;
                            line-height: 1.5;
                            color: rgba(255, 255, 255, 0.9);
                        ">
                            <strong>P.S.</strong> ${
                              isHebrew
                                ? "אם המערכת עזרה לך, שקול לשתף אותה עם מישהו שיכול להפיק ממנה תועלת. כוח שקט מתרבה כשהוא משותף."
                                : "If this system helped you, consider sharing it with someone who could benefit. Quiet power multiplies when shared."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

    await transporter.sendMail({
      from: `"Napoleon Hill AI Coach" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email API Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
