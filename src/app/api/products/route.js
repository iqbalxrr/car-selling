import dbConnect from "@/lib/dbConnect";

// GET → fetch all products
export async function GET() {
  try {
    const client = await dbConnect();
    const db = client.db("car-selling");
    const collection = db.collection("products");

    const products = await collection.find().sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// POST → add new product
export async function POST(req) {
  try {
    const client = await dbConnect();
    const db = client.db("car-selling");
    const collection = db.collection("products");
    const product = await req.json();

    await collection.insertOne({
      ...product,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Product added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
