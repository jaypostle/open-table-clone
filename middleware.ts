import { NextRequest, NextResponse } from "next/server";

import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  /// This is middleware for auth endpoint. If we return an error, we will not go to the endpoint.

  // extract json web token from header
  const bearerToken = req.headers.get("authorization") as string;
  if (!bearerToken) {
    return new NextResponse( // this is how return res.status(401).json is run in the middleware
      JSON.stringify({ errorMessage: "Unauthorized request." }),
      { status: 401 }
    );
  }

  // get just the token from the header
  const token = bearerToken.split(" ")[1]; // splits the bearer token because it comes in with Bearer (space) then the token

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request." }),
      { status: 401 }
    );
  }

  // get our secret
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // verify that the token matches the secret
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request. Verify" }),
      { status: 401 }
    );
  }
}

// defines the routes we want this middleware to run before
export const config = {
  matcher: ["/api/auth/me"],
};
