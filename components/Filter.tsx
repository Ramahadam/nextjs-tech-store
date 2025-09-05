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
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";

export default function Filter() {
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
          <SelectItem value="laptops">Laptops</SelectItem>
          <SelectItem value="desktops">Desktops</SelectItem>
          <SelectItem value="printers">Printers</SelectItem>
          <SelectItem value="accessories">accessories</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
