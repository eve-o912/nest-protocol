import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from './label'
import { Input } from './input'

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn('space-y-6', className)}
    {...props}
  />
))
Form.displayName = 'Form'

const FormFieldContext = React.createContext<
  {
    name: string
  } | undefined
>(undefined)

const FormField = ({
  ...props
}: React.PropsWithChildren<{ name: string }>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <div className="space-y-2">{props.children}</div>
    </FormFieldContext.Provider>
  )
}

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
))
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { name } = useFormContext() || {}
  return (
    <Label
      ref={ref}
      className={cn(className)}
      htmlFor={name}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { register } = useFormContext() || {}
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  )
})
FormControl.displayName = 'FormControl'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formState: { errors } } = useFormContext() || { formState: { errors: {} } }
  const { name } = useFormContext() || {}
  const error = name ? errors[name as keyof typeof errors] : undefined
  
  if (!error) return null
  
  return (
    <p
      ref={ref}
      className={cn('text-sm text-destructive', className)}
      {...props}
    >
      {error.message?.toString()}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
