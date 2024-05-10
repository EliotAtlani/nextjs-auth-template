import React, { useEffect, useState } from "react";

import SubscriptionCard from "./subscription-card";

import { Button } from "@/components/ui/button";
import { StepFourProps } from "@/types/user";

const Step4 = ({
  formData,
  prevStep,
  postData,
  subscriptions,
}: StepFourProps) => {
  const [selectedSubscription, setSelectedSubscription] = useState<string>(
    formData.subscription ||
      (subscriptions && subscriptions[0]?.title) ||
      "free"
  );

  const addSubscriptionToFormData = () => {
    // Add selected subscription to formData
    formData.subscription = selectedSubscription;
  };

  useEffect(() => {
    addSubscriptionToFormData();
  }, [selectedSubscription]);

  return (
    <div>
      <div className="flex gap-4 w-full">
        {subscriptions?.map((subscription) => (
          <SubscriptionCard
            key={subscription.title}
            selectedSubscription={selectedSubscription}
            setSelectedSubscription={setSelectedSubscription}
            {...subscription}
          />
        ))}
      </div>
      <div className="mt-4 w-full flex justify-center gap-2">
        <Button
          type="button"
          onClick={prevStep}
          className="bg-foreground text-background"
        >
          Prev step
        </Button>
        <Button type="button" onClick={postData}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Step4;
