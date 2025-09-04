"use client";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";

function Announcement() {
  return (
    <article className="w-full bg-primary-custom">
      <Alert className="flex gap-8  text-white flex-col md:flex-row border-none w-full rounded-none md:max-w-[80%] mx-auto bg-primary-custom items-center md:justify-evenly">
        <AlertTitle>
          <Button variant="ghost">
            <Link href="tel:0024990000067"> +0024990000067</Link>
          </Button>
        </AlertTitle>
        <AlertDescription className="text-white font-medium flex flex-col items-center md:flex-row">
          <p> Heads up! - Get 50% off on selected itesm |</p>
          <Button variant="ghost">
            <Link href="/products"> Shop now</Link>
          </Button>
        </AlertDescription>
      </Alert>
    </article>
  );
}

export default Announcement;
