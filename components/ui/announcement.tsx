"use client";
import { Alert, AlertDescription, AlertTitle } from "./alert";

function Announcement() {
  return (
    <article className="w-full">
      <Alert className="flex gap-8 bg-primary-custom text-white border-none w-full rounded-none ">
        <AlertTitle>+090938984398</AlertTitle>
        <AlertDescription className="text-white">
          Heads up! - Get 50% off on selected itesm |
        </AlertDescription>
      </Alert>
    </article>
  );
}

export default Announcement;
