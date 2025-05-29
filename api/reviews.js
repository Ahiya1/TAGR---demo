// Note: This uses temporary storage. For production, use a database like MongoDB, Supabase, or Airtable
let reviews = [
  // Sample reviews to start with
  {
    id: 1,
    userName: "Sarah",
    rating: 5,
    comment:
      "This transformed my mindset completely! I finally have a clear path to my financial goal.",
    language: "en",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    userName: "משה",
    rating: 5,
    comment: "כלי מדהים! עזר לי להגדיר את המטרה שלי בצורה ברורה ומעשית.",
    language: "he",
    date: new Date().toISOString(),
  },
  {
    id: 3,
    userName: "David",
    rating: 4,
    comment:
      "The Napoleon Hill principles really come alive with this AI coach. Highly recommend!",
    language: "en",
    date: new Date().toISOString(),
  },
];

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

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    res.json(reviews.slice(0, 10)); // Return top 10 reviews
  } catch (error) {
    console.error("Reviews API Error:", error);
    res.status(500).json([]);
  }
}
