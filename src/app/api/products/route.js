import dbConnect from "@/lib/dbConnect";

export async function POST(req) {

    try{
     const client = await dbConnect();
     const db = client.db("car-selling");
     const collection = db.collection("products");
        const product = await req.json();

        // Insert new product
        await collection.insertOne({
            ...product,
            createdAt: new Date(),
        });
        return new Response(
            JSON.stringify({ message: "Product added successfully" }),
            { status: 201 }
        );
        

    }
    catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
    
}