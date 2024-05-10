import { CircleCheckBig, CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SubscriptionCardProps } from "@/types/user";

const SubscriptionCard = ({
  selectedSubscription,
  setSelectedSubscription,
  title,
  price,
  features,
  no_features,
}: SubscriptionCardProps) => {
  return (
    <Card
      className={cn(
        "w-[300px] min-h-[400px] border-muted-foreground",
        selectedSubscription == title ? "bg-primary" : ""
      )}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            selectedSubscription == title ? "text-background" : "",
            "text-center mb-4 capitalize"
          )}
        >
          {title}
        </CardTitle>
        <Label
          className={cn(
            selectedSubscription == title ? "text-background" : "",
            "font-bold text-4xl text-center mt-2"
          )}
        >
          ${price}
          <span
            className={cn(
              selectedSubscription == title
                ? "text-muted"
                : "text-muted-foreground",
              " font-normal text-2xl"
            )}
          >
            /month
          </span>
        </Label>

        <Button
          className={cn(
            selectedSubscription == title
              ? "bg-background text-primary hover:bg-secondary"
              : "bg-primary"
          )}
          style={{ marginTop: "30px" }}
          onClick={() => setSelectedSubscription(title)}
        >
          {" "}
          {selectedSubscription === title ? "Selected" : "Select"}{" "}
        </Button>
      </CardHeader>
      <CardContent>
        <ul>
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                selectedSubscription == title
                  ? "text-background"
                  : "text-muted-foreground",
                "flex items-center "
              )}
            >
              <CircleCheckBig
                className={cn(
                  selectedSubscription == title
                    ? "text-green-400"
                    : "text-green-700",
                  "mr-2  font-bold"
                )}
                size={18}
              />
              {feature}
            </li>
          ))}

          {no_features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                selectedSubscription == title
                  ? "text-background"
                  : "text-muted-foreground",
                "flex items-center "
              )}
            >
              <CircleX
                className={cn(
                  selectedSubscription == title
                    ? "text-gray-300"
                    : "text-gray-500",
                  "mr-2  font-bold"
                )}
                size={20}
              />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
