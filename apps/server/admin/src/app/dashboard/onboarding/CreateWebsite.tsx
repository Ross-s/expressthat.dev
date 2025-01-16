import { updateName } from "@/app/actions/user/profile";
import { useState } from "react";

export function CreateWebsite(props: {
  nextStage: () => void;
  previousStage: () => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-75">
      <div className="bg-base-200 p-6 rounded-lg shadow-lg min-w-md">
        <h2 className="text-xl font-bold mb-4 ">First Website</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  name="firstName"
                  className="input"
                  placeholder="John"
                  //value={firstName}
                  //onChange={(e) => setFirstName(e.target.value)}
                />
                {/* {errors.firstName && (
                  <p className="fieldset-label text-error">
                    {errors.firstName}
                  </p>
                )} */}
              </fieldset>
            </div>
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Url</legend>
                <input
                  type="text"
                  name="lastName"
                  className="input"
                  placeholder="Smith"
                  //value={lastName}
                  //onChange={(e) => setLastName(e.target.value)}
                />
                {/* {errors.lastName && (
                  <p className="fieldset-label text-error">{errors.lastName}</p>
                )} */}
              </fieldset>
            </div>
          </div>
          <div className="flex justify-evenly">
            <button className="btn btn-primary" onClick={props.previousStage}>
              Back
            </button>
            <button className="btn btn-secondary" /*onClick={onClick}*/>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
