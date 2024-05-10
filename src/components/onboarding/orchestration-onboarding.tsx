/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Subscriptions, User } from "@prisma/client";
import { useEffect, useState } from "react";

import ProcessingForm from "@/components/onboarding/processing-form";
import ShowStep from "@/components/onboarding/show-step";
import Step4 from "@/components/onboarding/step-four";
import Step1 from "@/components/onboarding/step-one";
import Step3 from "@/components/onboarding/step-three";
import Step2 from "@/components/onboarding/step-two";
import { onBoardingForm } from "@/types/user";

const Onboarding = ({ session }: { session: User }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: any, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: e.target?.files?.[0] });
  };

  const removeFromFormData = (fieldNameToRemove: string) => {
    // Create a copy of the current formData
    const updatedFormData = { ...formData };

    // Check if the field exists in the formData
    if (fieldNameToRemove in updatedFormData) {
      // Use the delete operator to remove the field
      delete updatedFormData[fieldNameToRemove];

      // Update the state with the modified formData
      setFormData(updatedFormData);
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const postData = async () => {
    try {
      nextStep();
      const NewFormData = new FormData();
      NewFormData.append("email", session.email);
      NewFormData.append("job", formData.job);
      NewFormData.append("country", formData.country);
      NewFormData.append("subscription", formData.subscription);
      NewFormData.append("cv", formData.cv);
      NewFormData.append("image", formData.image);

      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: NewFormData,
      });

      setLoading(false);
      if (response.ok) {
        setSuccess(true);
        //Wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        //Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setSuccess(false);
        setErrorMsg(`Failed to process data: ${response.statusText}`);
        console.error("Failed to fetch subscriptions:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching subscriptions:", error);
    }
  };

  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/subscriptions");
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setSubscriptions(data);
        } else {
          console.error("Failed to fetch subscriptions:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching subscriptions:", error);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  // Render step components based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <ShowStep actualStep={step} totalStep={4} />
            <Step1
              nextStep={nextStep}
              handleChange={handleChange}
              formData={formData as onBoardingForm}
            />
          </>
        );
      case 2:
        return (
          <>
            <ShowStep actualStep={step} totalStep={4} />
            <Step2
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              handleFileUpload={handleFileUpload}
              formData={formData as onBoardingForm}
            />
          </>
        );
      case 3:
        return (
          <>
            <ShowStep actualStep={step} totalStep={4} />
            <Step3
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              handleFileUpload={handleFileUpload}
              removeFromFormData={removeFromFormData}
              formData={formData as onBoardingForm}
            />
          </>
        );
      case 4:
        return (
          <>
            <ShowStep actualStep={step} totalStep={4} />
            <Step4
              prevStep={prevStep}
              handleChange={handleChange}
              handleFileUpload={handleFileUpload}
              formData={formData as onBoardingForm}
              nextStep={nextStep}
              postData={postData}
              subscriptions={subscriptions}
            />
          </>
        );
      case 5:
        return (
          <ProcessingForm
            loading={loading}
            success={success}
            errorMsg={errorMsg}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default Onboarding;
