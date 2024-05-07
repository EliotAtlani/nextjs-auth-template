import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StepProps } from "@/types/user";

const Step2 = ({
  nextStep,
  formData,
  prevStep,
  handleFileUpload = () => {},
}: StepProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Upload your profile picture</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex items-center justify-center">
              <Avatar className="w-[80px] h-[80px]">
                <AvatarImage
                  src={
                    formData.image
                      ? URL.createObjectURL(formData.image)
                      : "/logo-light.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                type="file"
                id="image"
                name="image"
                accept=".png,.jpeg,jpg"
                onChange={(e) => handleFileUpload(e, "image")}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button type="button" onClick={prevStep} className="bg-foreground">
          Prev step
        </Button>
        <Button type="button" onClick={nextStep} disabled={!formData.image}>
          Next step
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step2;
