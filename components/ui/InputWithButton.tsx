import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputWithButton() {
  return (
    <div className="flex w-[15rem] max-w-sm  mx-auto sm:mx-0 items-center gap-2 bg-muted-foreground rounded-md text-lightGray ocus-within:border-primary-custom shadow-none">
      <Input
        type="email"
        placeholder="Enter Email"
        className="outline-none border-none shadow-none placeholder:text-lightGray placeholder:text-sm focus-visible:ring-0 focus-visible:shadow-none text-sm"
      />
      <Button type="submit" className="bg-secondary-custom">
        Subscribe
      </Button>
    </div>
  );
}
