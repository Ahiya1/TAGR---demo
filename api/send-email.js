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
    console.error("Email API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
