"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  getFirstAndLastName,
  updateOnboardState,
} from "@/app/actions/user/profile";
import { OnboardStage } from "@/app/actions/user/onBoardingState";

const AboutYou = dynamic(() =>
  import("./AboutYou").then((mod) => mod.AboutYou),
);
const Welcome = dynamic(() => import("./Welcome").then((mod) => mod.Welcome));
const CreateWebsite = dynamic(() =>
  import("./CreateWebsite").then((mod) => mod.CreateWebsite),
);

export function Onboard(props: { onboardingState: OnboardStage }) {
  const [onboardStage, setOnboardState] = useState<OnboardStage>(
    props.onboardingState,
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (props.onboardingState != onboardStage) {
      updateOnboardState(onboardStage);
    }
  }, [onboardStage, props.onboardingState]);

  useEffect(() => {
    console.log(onboardStage, OnboardStage.AboutYou);
    if (onboardStage >= OnboardStage.AboutYou) {
      (async () => {
        const userNames = await getFirstAndLastName();
        setFirstName(userNames.firstName ?? "");
        setLastName(userNames.lastName ?? "");
      })();
    }
  }, [onboardStage]);

  return (
    <>
      {onboardStage == OnboardStage.Welcome && (
        <Welcome nextStage={() => setOnboardState(OnboardStage.AboutYou)} />
      )}
      {onboardStage == OnboardStage.AboutYou && (
        <AboutYou
          nextStage={() => setOnboardState(OnboardStage.FirstWebsite)}
          previousStage={() => setOnboardState(OnboardStage.Welcome)}
          firstName={firstName}
          lastName={lastName}
        />
      )}
      {onboardStage == OnboardStage.FirstWebsite && (
        <CreateWebsite
          nextStage={() => setOnboardState(OnboardStage.Complete)}
          previousStage={() => setOnboardState(OnboardStage.AboutYou)}
        />
      )}
    </>
  );
}
