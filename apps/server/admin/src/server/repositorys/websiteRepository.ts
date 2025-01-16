import { Website, type Prisma } from "@expressthat/db";
import { prisma } from "@expressthat/db";
import { cache } from "../cache";
import { CACHE_PREFIX } from "../constants";
const WEBSITE_CACHE_PREFIX = `${CACHE_PREFIX}:Websites`;

export const WebsiteRepository = {
  async create(website: Prisma.WebsiteCreateInput) {
    const inserted = await prisma.website.create({
      data: {
        name: website.name,
        url: website.url,
      },
    });

    await cache.set(`${WEBSITE_CACHE_PREFIX}:${inserted.id}`, inserted, {});

    return inserted;
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
