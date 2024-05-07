import { Session } from "next-auth";

export type User = Session & {
  name: string;
  email: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type StepProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange?: (e: any) => void;
  handleFileUpload?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    fieldName: string
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: onBoardingForm;
  removeFromFormData?: (fieldNameToRemove: string) => void;
};

export type StepFourProps = StepProps & {
  postData: () => void;
};
export type onBoardingForm = {
  country: string;
  job: string;
  cv: File;
  image: File;
  subscription: string;
};

export type SubscriptionCardProps = {
  selectedSubscription: string;
  setSelectedSubscription: (value: string) => void;
  title: string;
  price: number;
  features: string[];
  no_features: string[];
};
