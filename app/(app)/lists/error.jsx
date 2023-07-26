'use client'
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  const goHome = () => {
    router.push("/lists");
  };

  return (
    <div className="error flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">{error.message}</p>
      </div>
      <button className="text-start" onClick={goHome}>
        Start from the <span className="underline">home page</span>
      </button>
    </div>
  );
}