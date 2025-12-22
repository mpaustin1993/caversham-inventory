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
  // Parse date string as local date without timezone conversion
  let date: Date | undefined;
  if (value) {
    if (typeof value === "string" && value) {
      // Extract YYYY-MM-DD from any date string format
      const dateOnly = value.split('T')[0];
      const [year, month, day] = dateOnly.split('-').map(Number);
      date = new Date(year, month - 1, day); // month is 0-indexed
    } else if (value instanceof Date) {
      date = value;
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          className="data-[empty=true]:text-muted-foreground w-[66%] justify-start text-left font-normal"
          variant="outline"
          data-empty={!date}
          onBlur={onBlur}
          aria-invalid={ariaInvalid}
        >
          <CalendarIcon />
          {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (onChange) {
              if (d) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                onChange(`${year}-${month}-${day}`);
              } else {
                onChange("");
              }
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}