import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { SuccessDialog } from '@components/home/SuccesDialog'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "el nombre debe tener por lo menos 2 caracteres",
  }),
  email: z.string().email({
    message: "el email debe ser valido",
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
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setOpenFirst(true)
    // try {

    //   const ebookId = import.meta.env.PUBLIC_MAILERLITE_EBOOK_GROUP_ID
    //   console.log(ebookId)
    //   const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'accept': 'application/json',
    //       Authorization: `Bearer ${import.meta.env.PUBLIC_MAILERLITE_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       email: values.email,
    //       fields: { name: values.name },
    //       groups: [`${groupId}`],
    //     })
    //   })
    //   if (!response.ok) {
    //     throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    //   }
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error)
    // }
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
                <Input className='bg-transparent placeholder:text-slate-50' aria-label='Nombre' placeholder="Nombre" {...field} />
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
                <Input className='bg-transparent placeholder:text-slate-50' aria-label='Email' placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='bg-yema w-full hover:bg-marmol' type="submit">Enviar</Button>
      </form>
      <SuccessDialog open={openFirst} onClose={() => setOpenFirst(false)} />
    </Form>
  )
}
export default FormEbook;