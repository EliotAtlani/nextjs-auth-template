import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-[110px] w-[280px] rounded-xl" />
        <Skeleton className="h-[110px] w-[280px] rounded-xl" />
        <Skeleton className="h-[110px] w-[280px] rounded-xl" />
        <Skeleton className="h-[110px] w-[280px] rounded-xl" />
      </div>
      <div>
        <Skeleton className=" w-full  h-[500px] rounded-xl" />
      </div>
    </main>
  );
}
