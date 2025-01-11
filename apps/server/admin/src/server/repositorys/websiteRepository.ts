import { Website, type Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { cache } from "../cache";
import { CACHE_PREFIX } from "../constants";
const WEBSITE_CACHE_PREFIX = `${CACHE_PREFIX}:Websites`;

export const WebsiteRepository = {
  async create(website: Prisma.WebsiteCreateInput) {
    const inserted = await prisma.website.create({
      data: {
        name: website.name,
      },
    });

    await cache.set(`${WEBSITE_CACHE_PREFIX}:${inserted.id}`, inserted, {});
  },

  async findById(id: string) {
    const cached = await cache.get<Website>(`${WEBSITE_CACHE_PREFIX}:${id}`);

    if (cached) {
      return cached;
    }

    const website = await prisma.website.findFirst({
      where: {
        id,
      },
    });

    if (website) {
      await cache.set(`${WEBSITE_CACHE_PREFIX}:${id}`, website, {});
    }

    return website;
  },
};
