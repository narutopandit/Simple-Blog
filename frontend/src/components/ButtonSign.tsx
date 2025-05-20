

interface buttonType {
  title: string;
  onClick: (e: any) =>void;
}

export function SignButton({ title ,onClick}: buttonType) {
  return (
    <button onClick={onClick} className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 w-8/12 dark:focus:ring-gray-600 me-2 mb-2">
      {title}
    </button>
  );
}