"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  value,
  onChange,
  name,
  id,
  onBlur,
  "aria-invalid": ariaInvalid
}: {
  value?: string | Date;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  onBlur?: React.FocusEventHandler;
  "aria-invalid"?: boolean;
}) {
  // Accepts value as ISO string or Date
  const date = value ? (typeof value === "string" ? (value ? new Date(value) : undefined) : value) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
          name={name}
          id={id}
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