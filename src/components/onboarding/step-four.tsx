import { Subscriptions } from "@prisma/client";
import React, { useEffect, useState } from "react";

import SubscriptionCard from "./subscription-card";

import { Button } from "@/components/ui/button";
import { StepFourProps } from "@/types/user";

const Step4 = ({ formData, prevStep, postData }: StepFourProps) => {
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  console.log("subs", subscriptions);

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
        <Button type="button" onClick={prevStep} className="bg-foreground">
          Prev step
        </Button>
        <Button type="button" onClick={postData} disabled={loading}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Step4;
