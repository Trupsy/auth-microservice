import { Request, Response } from "express";
import { CRes } from "../networking/CRes.js";
import { EResError } from "../enums/EResError.js";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = {
    email: req.query.email as string,
    password: req.query.password as string,
  }

  if (!email || !password)
    return res
      .status(400)
      .send(CRes.error("Missing email or password", EResError.INVALID_BODY));

  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  });

  if (!user)
    return res
      .status(404)
      .send(CRes.error("User not found", EResError.NOT_FOUND));

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res
      .status(401)
      .send(CRes.error("User not found", EResError.INVALID_PASSWORD));

  if (!user.password) delete (user as { password?: string }).password;
  return res.status(200).send({
    status: true,
    message: "User authenticated",
    data: {
      user,
    },
  });
};
