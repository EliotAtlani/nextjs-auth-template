import PuffLoader from "react-spinners/PuffLoader";

import { Label } from "../ui/label";

type ProcessingFormProps = {
  loading: boolean;
  errorMsg: string;
  success: boolean;
};
const ProcessingForm = ({
  loading,
  errorMsg,
  success,
}: ProcessingFormProps) => {
  return (
    <>
      {loading && (
        <div className="flex flex-col items-center">
          <PuffLoader color="#7c3aed" size={50} />
          <Label className="text-2xl mt-4"> Processing your data...</Label>
        </div>
      )}
      {!loading && success && (
        <div className="flex flex-col items-center">
          <Label className="text-2xl mt-4"> Data processed successfully</Label>
          <Label className="text-2xl mt-4"> You will be soon redirected</Label>
        </div>
      )}
      {!loading && !success && (
        <div className="flex flex-col items-center">
          <Label className="text-2xl mt-4"> Failed to process data</Label>
          <Label className="text-2xl mt-4">{errorMsg}</Label>
        </div>
      )}
    </>
  );
};

export default ProcessingForm;
