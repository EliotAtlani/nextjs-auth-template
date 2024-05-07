/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "@/types/user";

const Step1 = ({
  nextStep = () => {},
  handleChange = () => {},
  formData,
}: StepProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    formData.country || ""
  );
  const [error, setError] = useState<string>("");
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    handleChange({ target: { name: "country", value } });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!selectedCountry) {
      setError("Please select a country");
      return;
    }
    nextStep();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>First steps</CardTitle>
        <CardDescription>We need more information about you !</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Job position</Label>
              <Input
                type="text"
                id="job"
                name="job"
                value={formData.job || ""}
                onChange={handleChange}
                placeholder="Ex: Software engineer"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Residency country</Label>
              <Select
                onValueChange={handleCountryChange}
                value={selectedCountry}
                required={true}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="us">US</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <div></div>
          <Button type="submit">Next step</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Step1;
