"use server";

import { auth } from "@/server/auth";
import { UserRepository } from "@/server/repositorys/UserRepository";
import { OnboardStage } from "./onBoardingState";

export async function updateOnboardState(state: OnboardStage): Promise<void> {
    const session = await auth();

    if (!session) {
        return;
    }

    await UserRepository.update(session.user.id, {
        onboardingState: state,
    });
}

export async function getFirstAndLastName(): Promise<{ firstName?: string; lastName?: string; }> {
    const session = await auth();

    if (!session) {
        return {};
    }

    const user = await UserRepository.findById(session.user.id);

    if (!user) {
        return {};
    }

    return {
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
    };
}

export async function updateName(firstName: string, lastName: string): Promise<[boolean, { firstName?: string; lastName?: string; }]> {
    const errors: {
        firstName?: string;
        lastName?: string;
    } = {};

    const session = await auth();

    if (!firstName || typeof firstName !== 'string' || !/^[a-zA-Z]+$/.test(firstName)) {
        errors.firstName = "Invalid first name";
    }

    if (!lastName || typeof lastName !== 'string' || !/^[a-zA-Z]+$/.test(lastName)) {
        errors.lastName = "Invalid last name";
    }

    if (errors.firstName || errors.lastName) {
        return [false, errors];
    }
    
    if (!session) {
        return [false, {}];
    }

    await UserRepository.update(session.user.id, {
        firstName,
        lastName,
    });

    return [true, {}];
}


