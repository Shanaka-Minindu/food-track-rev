import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default async function Home() {
  return <Button variant="destructive">Reset Password</Button>;
}
