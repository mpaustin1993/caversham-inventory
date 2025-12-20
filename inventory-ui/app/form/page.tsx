"use client"

import * as React from "react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
const formSchema = z.object({
  title: z
    .string(),
  description: z
    .string()
})

export function ItemForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      location: "",
      expiration_name: "",
      restock_threshold: 0,
      note: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Item</CardTitle>
        <CardDescription>
          Create a new Item by filling out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="item-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28 text-right">Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Milk"
                        autoComplete="off"
                        className="w-full"
                      />
                      {isInvalid && (
                        <FieldError className="mt-1" errors={field.state.meta.errors} />
                      )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="category"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28 text-right">Category</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Dairy"
                        autoComplete="off"
                        className="w-full"
                      />
                      {isInvalid && (
                        <FieldError className="mt-1" errors={field.state.meta.errors} />
                      )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export function Form() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create Item</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ItemForm />
      </PopoverContent>
    </Popover>
  )
}
