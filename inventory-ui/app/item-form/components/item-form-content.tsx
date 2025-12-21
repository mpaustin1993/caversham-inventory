"use client"

import * as React from "react"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { DatePicker } from "./date-picker";
import { Button } from "@/components/ui/button"
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

 
const formSchema = z.object({
  name: z.string().min(1, "*"),
  category: z.string().min(1, "*"),
  quantity: z.number().min(1, "*"),
  unit: z.string().min(1, "*"),
  location: z.string().min(1, "*"),
  expiration_date: z.string().min(1, "*"),
  restock_threshold: z.number().min(1, "*"),
  note: z.string().min(1, "*"),
})

export function ItemFormContent() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      location: "",
      expiration_date: "",
      restock_threshold: 0,
      note: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value)
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
                    <FieldLabel htmlFor={field.name} className="w-28">Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Name"
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
                    <FieldLabel htmlFor={field.name} className="w-28">Category</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Category"
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
              name="quantity"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Quantity</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={!isNaN(Number(field.state.value)) ? field.state.value : 0}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(!isNaN(Number(e.target.value)) ? parseInt(e.target.value) : 0)}
                        aria-invalid={isInvalid}
                        placeholder="Quantity"
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
              name="unit"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Unit</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Unit"
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
              name="location"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Location</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Location"
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
              name="expiration_date"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Expiration<br /> Date</FieldLabel>                    
                      <DatePicker
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError className="mt-1" errors={field.state.meta.errors} />
                      )}                    
                  </Field>
                )
              }}
            />
            <form.Field
              name="restock_threshold"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Restock Threshold</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={!isNaN(Number(field.state.value)) ? field.state.value : 0}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(!isNaN(Number(e.target.value)) ? parseInt(e.target.value) : 0)}
                        aria-invalid={isInvalid}
                        placeholder="Restock Threshold"
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
              name="note"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" className="items-center gap-3" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className="w-28">Note</FieldLabel>                    
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Note"
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
          <Button type="submit" form="item-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}