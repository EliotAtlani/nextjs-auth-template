"use client";
import { motion } from "framer-motion";
import React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
const Step = ({
  actualStep,
  totalStep,
}: {
  actualStep: number;
  totalStep: number;
}) => {
  const steps = [];

  for (let i = 1; i < totalStep + 1; i++) {
    steps.push(
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          backgroundColor: i <= actualStep ? "#4F46E5" : "#D1D5DB",
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 100,
          duration: 2,
        }}
        key={i}
        className={cn("h-[10px] w-[30px] rounded-full")}
      />
    );
  }

  return steps;
};

const ShowStep = ({
  actualStep,
  totalStep,
}: {
  actualStep: number;
  totalStep: number;
}) => {
  return (
    <div className="w-full flex items-center flex-col justify-center">
      <Label>
        {" "}
        Question {actualStep} / {totalStep}
      </Label>
      <div className="w-full flex gap-2 items-center justify-center my-4">
        <Step actualStep={actualStep} totalStep={totalStep} />
      </div>
    </div>
  );
};

export default ShowStep;
