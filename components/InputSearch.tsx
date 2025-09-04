import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InputSearch() {
  return (
    <Card className="grid grid-cols-[1fr_20px] items-center justify-center  content-center max-w-fit p-0 px-2 focus-within:border-primary-custom shadow-none h-[2rem] ">
      <input
        type="text"
        placeholder="I am searching for"
        className="outline-none  text-sm placeholder:text-xs placeholder:opacity-70 py-[0.2rem]"
      />
      <Button variant="ghost" className="hover:bg-transparent">
        <Search className="text-primary-custom h-2" />
      </Button>
    </Card>
  );
}
