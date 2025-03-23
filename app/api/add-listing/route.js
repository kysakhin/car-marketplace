import { db } from "@/app/config/firebase-config";
import { addDoc, updateDoc, arrayUnion, collection, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, listingTitle, tagline, originalPrice, sellingPrice, category, condition, maker, year, transmission, engineSize, cylinders, description, selectedFeatures, images } = body;

    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // todo: connect to cloudinary. USE ENV VARIABLES.

    const docref = await addDoc(collection(db, "car-listings"), {
      userId,
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
      createdAt: serverTimestamp(),
    });

    const userRef = doc(db, "user-details", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        listings: arrayUnion(docref.id),
      });
    } else {
      await setDoc(userRef, {
        listings: [docref.id],
      });
    }

    return NextResponse.json({
      message: "Listing added successfully.",
      listingId: docref.id,
    }, { status: 200 });
  } catch (error) {
    console.error("Error adding listing:", error);
    return NextResponse.json({
      message: "Internal server error",
      error: error.message,
    }, { status: 500 });
  }
}
