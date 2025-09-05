"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Sort() {
  const [value, setValue] = useState<string>("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[150px]  rounded-2xl bg-secondary !text-accent-foreground">
        <SelectValue
          placeholder="Select a category"
          className="placeholder:!text-black"
        />
      </SelectTrigger>
      <SelectContent className="rounded-2x">
        <SelectGroup>
          <SelectLabel>All categories</SelectLabel>
          <SelectItem value="popularity">best-sellings</SelectItem>
          <SelectItem value="ratings">customer reviews</SelectItem>
          <SelectItem value="newest">newst-recently added</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
