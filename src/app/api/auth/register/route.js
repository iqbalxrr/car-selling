import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const client = await dbConnect();
    const db = client.db("car-selling"); 
    const collection = db.collection("users"); 

    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // Insert new user (plain password for now, can hash later)
    await collection.insertOne({ email, password, createdAt: new Date() });

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
