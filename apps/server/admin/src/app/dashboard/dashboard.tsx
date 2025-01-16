"use client";
import { useSession } from "next-auth/react";
import { Onboard } from "./onboarding/Onboard";
import { OnboardStage } from "../actions/user/onBoardingState";

export function Dashboard(props: {
  onboardingState: OnboardStage;
  refreshData: () => Promise<void>;
}) {
  const { data: session } = useSession();

  return (
    <>
      {props.onboardingState != OnboardStage.Complete && (
        <Onboard onboardingState={props.onboardingState} />
      )}
    </>
  );
}
