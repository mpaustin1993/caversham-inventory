"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  id,
  name,
  value,
  onChange,
  onBlur,
  "aria-invalid": ariaInvalid
}: {
  id?: string;
  name?: string;
  value?: string | Date;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler;
  "aria-invalid"?: boolean;
}) {
  // Accepts value as ISO string or Date
  const date = value ? (typeof value === "string" ? (value ? new Date(value) : undefined) : value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          className="data-[empty=true]:text-muted-foreground w-[74%] justify-start text-left font-normal"
          variant="outline"
          data-empty={!date}
          onBlur={onBlur}
          aria-invalid={ariaInvalid}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (onChange) onChange(d ? d.toISOString() : "");
          }}
        />
      </PopoverContent>
    </Popover>
  );
}