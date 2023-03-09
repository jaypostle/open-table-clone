import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // extract json web token from header
  const bearerToken = req.headers["authorization"] as string;
  if (!bearerToken) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (no bearer token)." });
  }

  // get just the token from the header
  const token = bearerToken.split(" ")[1]; // splits the bearer token because it comes in with Bearer (space) then the token

  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (no token)." });
  }

  // get our secret
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // verify that the token matches the secret
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (token invalid)." });
  }

  // get the payload of the header
  const payload = jwt.decode(token) as { email: string }; // as email string helps verify the proper type for when we call payload.email in the prisma call below

  // if no email in the payload, return
  if (!payload.email) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorized request (no email)." });
  }

  // find the user from the payloads email
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
    },
  });
  return res.json({ user });
}
