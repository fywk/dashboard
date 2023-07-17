"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleClick() {
    reset();
  }

  return (
    <div>
      <p>Something went wrong!</p>
      <button onClick={handleClick}>Reset error boundary</button>
    </div>
  );
}
