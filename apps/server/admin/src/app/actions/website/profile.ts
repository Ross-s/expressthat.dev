"use server";
import { auth } from "@/server/auth";
import type { Prisma } from "@prisma/client";

export async function createWebsite(website: Prisma.WebsiteCreateInput) {
  const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }


}