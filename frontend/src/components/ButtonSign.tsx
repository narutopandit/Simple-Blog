import { Button } from "@material-tailwind/react";

export function SignButton({ title }: { title: string }) {
  return (
    <Button className="bg-gray-900 w-full max-w-sm min-w-[200px] mb-2">
      {title}
    </Button>
  );
}