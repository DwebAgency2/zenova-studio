import { NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export async function POST(req: Request) {
  

  try {
    const apiKey = process.env.BREVO_API_KEY;
    

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Server configuration error (missing API key)" },
        { status: 500 }
      );
    }

    const { name, email, phone, message } = await req.json();
    

    // Validate input
    if (!email || !name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

     // ✅ Auto-detect and normalize phone number
    let formattedPhone = phone.trim();
    const parsedNumber = parsePhoneNumberFromString(formattedPhone);

    if (parsedNumber && parsedNumber.isValid()) {
      formattedPhone = parsedNumber.number; // standardized E.164 format e.g. +14155552671
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid or unsupported phone number" },
        { status: 400 }
      );
    }

    // Make Brevo API request
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name, SMS: phone, MESSAGE: message, },
        listIds: [3],
        updateEnabled: true,
      }),
    }).catch((err) => {
      console.error("Network/Fetch error:", err);
      return null;
    });

    // If fetch itself failed
    if (!response) {
      return NextResponse.json(
        { success: false, error: "Failed to reach Brevo API" },
        { status: 502 }
      );
    }

    // Try parsing Brevo’s response safely
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      console.error("❌ Brevo API Error:", data);
      return NextResponse.json(
        { success: false, error: data?.message || "Brevo API request failed" },
        { status: response.status }
      );
    }

    
    return NextResponse.json({ success: true, message: "Contact created successfully" });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
