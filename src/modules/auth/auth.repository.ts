import { prisma } from "../../infra/prisma";
import { User, Role } from "@prisma/client";

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
  otp: string;
  isVerified?: boolean;
}) => prisma.user.create({ data });

export const findUserById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, password: true, isVerified: true,  },
  });
export async function updateUser(id: string, data: any) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
