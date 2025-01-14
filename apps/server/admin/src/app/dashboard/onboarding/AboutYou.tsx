import { updateName } from "@/app/actions/user/profile";
import { useEffect, useState } from "react";

export function AboutYou(props: {
  nextStage: () => void;
  previousStage: () => void;
  firstName?: string;
  lastName?: string;
}) {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
  }>({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function onClick() {
    const result = await updateName(firstName, lastName);

    if (!result[0]) {
      setErrors(result[1]);
    } else {
      props.nextStage();
    }
  }

  useEffect(() => {
    if (props.firstName) {
      setFirstName(props.firstName);
    }

    if (props.lastName) {
      setLastName(props.lastName);
    }
  }, [props.firstName, props.lastName]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-75">
      <div className="bg-base-200 p-6 rounded-lg shadow-lg min-w-md">
        <h2 className="text-xl font-bold mb-4 ">About you</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  className="input"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="fieldset-label text-error">
                    {errors.firstName}
                  </p>
                )}
              </fieldset>
            </div>
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  className="input"
                  placeholder="Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="fieldset-label text-error">{errors.lastName}</p>
                )}
              </fieldset>
            </div>
          </div>
          <div className="flex justify-evenly">
            <button className="btn btn-primary" onClick={props.previousStage}>
              Back
            </button>
            <button className="btn btn-secondary" onClick={onClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
