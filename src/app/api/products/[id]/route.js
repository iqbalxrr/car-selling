

import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req , {params}) {

    const {id} = params;

    try{
        const client = await dbConnect();
        const db = client.db("car-selling");
        const collection = db.collection("products");

        const product = await collection.findOne({ _id: new ObjectId(id) });
        if (!product) {
            return new Response("Product not found", { status: 404 });
        }
        return new Response(JSON.stringify(product), { status: 200 });
    }catch (error) {
        console.error("Error fetching product:", error);
        return new Response("Failed to fetch product", { status: 500 });
    }
    
}