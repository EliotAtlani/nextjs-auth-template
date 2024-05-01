import React from "react";

interface Error {
  [key: string]: string[];
}
const FormError = ({ errors }: { errors: string }) => {
  if (!errors) return null;
  const data = JSON.parse(errors) as Error;
  console.log("data", data);
  return (
    <div className="mt-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {Array.isArray(value) &&
            value.map((error, index) => (
              <p key={`${key}-${index}`} className="text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
};

export default FormError;
