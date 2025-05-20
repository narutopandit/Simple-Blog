

interface buttonType {
  title: string;
  onClick: (e: any) =>void;
}

export function SignButton({ title ,onClick}: buttonType) {
  return (
    <button onClick={onClick} className="bg-gray-900 w-full max-w-sm min-w-[200px] mb-2">
      {title}
    </button>
  );
}