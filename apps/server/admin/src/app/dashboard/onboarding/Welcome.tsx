"use client";
export function Welcome(props: { nextStage: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-75">
      <div className=" p-6 rounded-lg shadow-lg bg-base-200">
        <h2 className="text-xl font-bold mb-4 ">Welcome to the ExpressThat</h2>
        <p className="mb-4 ">Let's get started with the onboarding process.</p>
        <div className="flex justify-center">
          <button className="btn btn-secondary" onClick={props.nextStage}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
