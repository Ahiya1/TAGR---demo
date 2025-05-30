const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Function to create PDF
async function createSuccessPDF(content, userName, language) {
  const isHebrew = language === "he";

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
  });

  const fileName = `success-blueprint-${userName}-${Date.now()}.pdf`;
  const filePath = path.join("/tmp", fileName);

  doc.pipe(fs.createWriteStream(filePath));

  // Add title
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor("#4f46e5")
    .text(
      isHebrew ? "תוכנית הצלחתך האישית" : "Your Personal Success Blueprint",
      { align: "center" }
    );

  doc.moveDown(1.5);

  // Add content (simplified - in real implementation you'd parse the HTML properly)
  doc
    .fontSize(12)
    .font("Helvetica")
    .fillColor("#374151")
    .text(content.replace(/<[^>]*>/g, ""), {
      // Strip HTML tags for PDF
      align: isHebrew ? "right" : "left",
      lineGap: 5,
    });

  doc.moveDown(2);

  // Add footer
  doc
    .fontSize(10)
    .fillColor("#6b7280")
    .text(isHebrew ? "בודאות שקטה, אחיה" : "With calm certainty, Ahiya", {
      align: "center",
    });

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(filePath));
  });
}

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
      ? `${userName} - תוכנית ההצלחה שלך מוכנה`
      : `${userName} - Your Success Blueprint is Ready`;

    const greeting = isHebrew ? `${userName} היקר,` : `Dear ${userName},`;

    const intro = isHebrew
      ? "הנה תוכנית ההצלחה שיצרנו יחד. זה לא עוד מסמך - זה המפה שלך לכוח השקט שכבר יש בך."
      : "Here's the success blueprint we created together. This isn't just another document - it's your map to the quiet power that's already within you.";

    const readingInstructions = isHebrew
      ? "קרא את זה כל בוקר וערב. לא כמו מנטרה נואשת, אלא כחזרה רגועה למי שאתה באמת ולמה שאתה ראוי לקבל."
      : "Read this every morning and evening. Not like a desperate mantra, but as a calm return to who you really are and what you're worthy of receiving.";

    const personalNote = isHebrew
      ? "המסע הזה של יצירת בהירות והעמדה בכוח שקט - זה מה שמעניין אותי באמת. אם משהו כאן נגע בך, או אם יש לך תובנות על איך לעשות את זה טוב יותר, אני באמת רוצה לשמוע."
      : "This journey of creating clarity and standing in quiet power - that's what genuinely interests me. If something here resonated with you, or if you have insights on how to make this better, I genuinely want to hear.";

    const replyPrompt = isHebrew
      ? "פשוט הגב למייל הזה. אני קורא כל מילה בעצמי."
      : "Just reply to this email. I read every word myself.";

    const pdfNote = isHebrew
      ? "רצית עותק PDF? הורד אותו כאן ושמור אותו במקום שתמיד תראה אותו."
      : "Want a PDF copy? Download it here and keep it somewhere you'll always see it.";

    const signature = isHebrew ? "אחיה" : "Ahiya";

    const postScript = isHebrew
      ? "אגב - אם זה עזר לך, שתף אותו עם מישהו שיכול להפיק מזה תועלת. הכוח הכי גדול הוא כשאנשים עוזרים לאנשים אחרים למצוא את השקט שלהם."
      : "By the way - if this helped you, share it with someone who could benefit. The greatest power is when people help others find their own quiet strength.";

    // Create PDF
    const pdfPath = await createSuccessPDF(content, userName, language);
    const pdfAttachment = {
      filename: `success-blueprint-${userName}.pdf`,
      path: pdfPath,
    };

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
            line-height: 1.6;
        ">
            <div style="max-width: 650px; margin: 0 auto; padding: 40px 20px;">
                
                <!-- Main Card -->
                <div style="
                    background: rgba(255, 255, 255, 0.98);
                    border-radius: 20px;
                    padding: 50px 40px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                ">
                    <!-- Top accent -->
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 3px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    "></div>

                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="
                            font-family: 'Crimson Text', serif;
                            font-size: 2rem;
                            font-weight: 600;
                            margin: 0 0 15px 0;
                            color: #1f2937;
                            line-height: 1.2;
                        ">
                            ${
                              isHebrew
                                ? "תוכנית ההצלחה שלך"
                                : "Your Success Blueprint"
                            }
                        </h1>
                        <div style="
                            width: 60px;
                            height: 2px;
                            background: linear-gradient(135deg, #f59e0b, #ec4899);
                            margin: 0 auto;
                        "></div>
                    </div>

                    <!-- Greeting -->
                    <div style="margin-bottom: 35px;">
                        <p style="
                            font-size: 1.1rem;
                            color: #374151;
                            margin: 0 0 20px 0;
                            font-weight: 500;
                        ">${greeting}</p>
                        
                        <p style="
                            font-size: 1rem;
                            color: #6b7280;
                            margin: 0;
                            line-height: 1.7;
                        ">${intro}</p>
                    </div>

                    <!-- Content -->
                    <div style="
                        border: 1px solid #e5e7eb;
                        padding: 35px;
                        border-radius: 12px;
                        margin-bottom: 35px;
                        background: #fafafa;
                    ">
                        ${content}
                    </div>

                    <!-- Reading Instructions -->
                    <div style="
                        background: linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%);
                        border-left: 3px solid #f59e0b;
                        padding: 25px;
                        border-radius: 8px;
                        margin-bottom: 35px;
                        ${
                          isHebrew
                            ? "border-left: none; border-right: 3px solid #f59e0b;"
                            : ""
                        }
                    ">
                        <p style="
                            margin: 0;
                            font-size: 1rem;
                            color: #92400e;
                            font-style: italic;
                            line-height: 1.7;
                        ">${readingInstructions}</p>
                    </div>

                    <!-- PDF Download -->
                    <div style="
                        text-align: center;
                        margin-bottom: 35px;
                        padding: 25px;
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                        border-radius: 12px;
                        border: 1px solid #0284c7;
                    ">
                        <p style="
                            margin: 0 0 20px 0;
                            color: #0c4a6e;
                            font-size: 1rem;
                        ">${pdfNote}</p>
                        <div style="
                            display: inline-block;
                            background: linear-gradient(135deg, #0ea5e9, #0284c7);
                            padding: 12px 25px;
                            border-radius: 8px;
                            text-decoration: none;
                            color: white;
                            font-weight: 600;
                            font-size: 0.95rem;
                        ">
                            📄 ${isHebrew ? "הורד PDF" : "Download PDF"}
                        </div>
                    </div>

                    <!-- Personal Note -->
                    <div style="
                        border-top: 1px solid #e5e7eb;
                        padding-top: 30px;
                        margin-bottom: 30px;
                    ">
                        <p style="
                            font-size: 1rem;
                            color: #374151;
                            margin: 0 0 20px 0;
                            line-height: 1.7;
                        ">${personalNote}</p>
                        
                        <p style="
                            font-size: 0.95rem;
                            color: #6b7280;
                            margin: 0;
                            font-style: italic;
                        ">${replyPrompt}</p>
                    </div>

                    <!-- Signature -->
                    <div style="
                        text-align: ${isHebrew ? "right" : "left"};
                        margin-bottom: 25px;
                    ">
                        <p style="
                            margin: 0;
                            font-size: 1rem;
                            color: #374151;
                        ">${signature}</p>
                    </div>

                    <!-- P.S. -->
                    <div style="
                        background: #f9fafb;
                        border-left: 2px solid #d1d5db;
                        padding: 20px;
                        border-radius: 6px;
                        ${
                          isHebrew
                            ? "border-left: none; border-right: 2px solid #d1d5db;"
                            : ""
                        }
                    ">
                        <p style="
                            margin: 0;
                            font-size: 0.9rem;
                            color: #6b7280;
                            line-height: 1.6;
                        ">
                            <strong>P.S.</strong> ${postScript}
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>`;

    await transporter.sendMail({
      from: `"${isHebrew ? "אחיה" : "Ahiya"}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      attachments: [pdfAttachment],
    });

    // Clean up PDF file
    if (fs.existsSync(pdfPath)) {
      fs.unlinkSync(pdfPath);
    }

    res.json({
      success: true,
      message: "Email sent successfully with PDF attachment",
    });
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
