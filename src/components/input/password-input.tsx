import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Input } from "../ui/input";
const PasswordInput = ({ id }: { id: string }) => {
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="relative">
      <Input id={id} type={type} required />
      <span className="absolute right-2 top-2" onClick={handleToggle}>
        {type === "password" ? <Eye size={25} /> : <EyeOff size={25} />}
      </span>
    </div>
  );
};

export default PasswordInput;
