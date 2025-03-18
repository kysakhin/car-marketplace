import { db } from "@/app/config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();

    // TODO: Save data to database

    const { listingTitle, tagline, originalPrice, sellingPrice, category, condition, maker, year, transmission, engineSize, cylinders, description, selectedFeatures } = body;

    await addDoc(collection(db, "car-listings"), {
      listingTitle,
      tagline,
      originalPrice,
      sellingPrice,
      category,
      condition,
      maker,
      year,
      transmission,
      engineSize,
      cylinders,
      description,
      selectedFeatures,
      createdAt: serverTimestamp()
    });

    return NextResponse.json({
      message: "Added successfully."
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}
