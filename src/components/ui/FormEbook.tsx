import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import SuccessDialog from '@components/home/SuccesDialog'
import ErrorDialog from '@components/home/ErrorDialog'
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Es un nombre muy corto :o debe tener al menos 2 letras",
  }),
  email: z.string().email({
    message: "Si no ingresás un mail válido no te puedo enviar el e-book :/",
  }),
})

interface Props {
  groupId: string
}

const FormEbook = ({ groupId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })
  const [openFirst, setOpenFirst] = React.useState(false)
  const [openError, setOpenError] = React.useState(false)
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          Authorization: `Bearer ${import.meta.env.PUBLIC_MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: values.email,
          fields: { name: values.name },
          groups: [`${groupId}`],
        })
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data)
      if (response.ok && !!data) {
        setOpenFirst(true)
      }
    } catch (error) {
      setOpenError(true)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='bg-transparent placeholder:text-slate-50' aria-label='Nombre' placeholder="¿Comó te gusta que te llamen?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='bg-transparent placeholder:text-slate-50' aria-label='Email' placeholder="¿Qué email abrís siempre?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full hover:bg-marmol font-semibold' type="submit">Obtener e-book</Button>
      </form>
      <SuccessDialog open={openFirst} onClose={() => setOpenFirst(false)} />
      <ErrorDialog open={openError} onClose={() => setOpenError(false)} />
    </Form>
  )
}
export default FormEbook;