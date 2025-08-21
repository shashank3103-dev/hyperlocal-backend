import { prisma } from "../../infra/prisma";
import { User, Role } from "@prisma/client";

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => prisma.user.create({ data });

export const findUserById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
