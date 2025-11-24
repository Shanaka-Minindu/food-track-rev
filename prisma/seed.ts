import { PrismaClient, Role } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const Prisma = new PrismaClient();

async function main() {
  const adminEmail = "super@adminEmail.com";
  const existingAdmin = await Prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("1234", 10);

    const admin = await Prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log(
      `Created Admin User, Name : ${admin.name}, Email : ${admin.email}`
    );
  } else {
    console.log(`Admin user exist, Email : ${existingAdmin.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
