import { Search } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export default function InputSearch() {
  return (
    <Card className="grid grid-cols-[1fr_20px] items-center justify-center max-w-fit p-0 px-2 focus-within:border-primary-custom shadow-none ">
      <input
        type="text"
        placeholder="I am searching for"
        className="outline-none  text-sm placeholder:text-xs placeholder:opacity-70 py-[0.4rem]"
      />
      <Button variant="ghost" className="hover:bg-transparent">
        <Search className="text-primary-custom h-4" />
      </Button>
    </Card>
  );
}
