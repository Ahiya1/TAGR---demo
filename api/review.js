// Note: This uses temporary storage. For production, use a database like MongoDB, Supabase, or Airtable
let reviews = [];

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
    console.error("Review API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
