import { ModeToggle } from "@/components/themes/mode-toggle";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <div className="fixed bottom-4 left-4">
        <ModeToggle />
      </div>
    </div>
  );
}
