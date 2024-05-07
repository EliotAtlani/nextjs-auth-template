import React, { useState } from "react";

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

const Step3 = ({
  nextStep,
  formData,
  prevStep,
  handleFileUpload = () => {},
  removeFromFormData = () => {},
}: StepProps) => {
  const [cvFile, setCvFile] = useState<File | null>(formData.cv || null);

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      handleFileUpload(e, "cv");
    }
  };

  const clearCvFile = () => {
    setCvFile(null);
    removeFromFormData("cv");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Upload your CV</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
              />
              {cvFile && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="/file.png" alt="File Icon" />
                      <AvatarFallback>
                        <span>F</span>
                      </AvatarFallback>
                    </Avatar>
                    <span>{cvFile.name}</span>
                  </div>
                  <Button variant="outline" onClick={clearCvFile}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button type="button" onClick={prevStep} className="bg-foreground">
          Prev step
        </Button>
        <Button type="button" onClick={nextStep} disabled={!cvFile}>
          Next step
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step3;
