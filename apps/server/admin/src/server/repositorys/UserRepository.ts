import { User, type Prisma } from "@expressthat/db";
import { prisma } from "@expressthat/db";
import { CACHE_PREFIX } from "../constants";
import { cache } from "../cache";

const USER_CACHE_PREFIX = `${CACHE_PREFIX}:Users`;

export const UserRepository = {
  async create(user: Prisma.UserCreateInput) {
    const inserted = await prisma.user.create({
      data: {
        email: user.email,
        providerId: user.providerId,
      },
    });

    await cache.set(`${USER_CACHE_PREFIX}:${inserted.id}`, inserted);

    return inserted;
  },

  async findById(id: string) {
    const result = await cache.get<User>(`${USER_CACHE_PREFIX}:${id}`);

    if (result) {
      return result;
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    await cache.set(`${USER_CACHE_PREFIX}:${id}`, user);

    return user;
  },

  async findByProviderId(providerId: string) {
    const user = await prisma.user.findFirst({
      where: {
        providerId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return null;
    }

    if (!(await cache.has(`${USER_CACHE_PREFIX}:${user.id}`))) {
      await cache.set(`${USER_CACHE_PREFIX}:${user.id}`, user);
    }
    return user;
  },

  async update(id: string, user: Prisma.UserUpdateInput) {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });

    await cache.set(`${USER_CACHE_PREFIX}:${id}`, updated);

    return updated;
  },
};
