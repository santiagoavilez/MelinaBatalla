import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
const formSchema = z.object({
  name: z.string().min(2, {
    message: "el nombre debe tener por lo menos 2 caracteres",
  }),
  email: z.string().email({
    message: "el email debe ser valido",
  }),
})

const FormEbook = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      // const res = await fetch('https://connect.mailerlite.com/api/groups', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'accept': 'application/json',
      //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYWVmODY3MzJlZmMwMTJlNDkzNWRmYmI0MDdmZGJjNDZhZmYzNWJhNDFkZDUwMGNkMzkwZWRhOWM5OWI0MTlhNDE2YmQwZjZhYzVmYzk2MjUiLCJpYXQiOjE2OTYzNjcxMzEuMTkwMzgzLCJuYmYiOjE2OTYzNjcxMzEuMTkwMzg2LCJleHAiOjQ4NTIwNDA3MzEuMTg1MjU3LCJzdWIiOiI2NTAyMjIiLCJzY29wZXMiOltdfQ.J1gEW0I1JLMMmlytJmi_5T_3K16DH4s7OMrgOXpLRkEG4i4_8osf2I42II6MqMLKiits6PMd84fC8SzbGztB1DNwrh5LgR0G8TgQ2zddHlZYy31HoeakhrSZT0vi6CpGxGAqHD_VJ8Sz_jT0yYng6VK_-1ap0JQ9fP5absBluPaBo8p79Fb9KBCQOE9vHfWOQb7giP5TvrhjvJAXs2izeSWBSKaeSvKWGqaMc0lGQ9f6_-9chnyVUznUHwlX8HFdk4kpOSwh_rLNwo1mcuqQiR3OdDLKI8QWPVX-FIha97DxqyEA2Bb14-FRewMmqm2vPdzZvttjQ1xs6Twz2S3uHSc8u-_6u4lgeDDtA_n1aMn82_jQEtc5L4xS8DCi2mW-Fnd8xHmnWR9cHhI5nSquL1KO1VSgIBZFaJE7UK0Lu8BNzbiSEYj4vtD_cSsYW8_Ph10sgtN4peW5CZCOVKTdLEqY0VTRFyioe8aXDYfX1fsIVsbHefQBUI4LXT11qb3tSfYhh54lB01mlCWHr7NrNbWOxEqNmGu3w__RzWdVMS6Y6Iwi0WcMuAzRwWqy6WSPE4w1Rx6RZtIeOSwmGNZQvysKJodCFZiZvRIVjEjR1dF9qGbcjnGXwqxYpDY6kvwqbKH4QE5-oSQhit92VH7FagbAr16tmP7cnv4uzgPrKxw`,
      //   }
      // })
      // const groups = await res.json();
      // console.log(groups)
      const ebookId = import.meta.env.PUBLIC_MAILERLITE_EBOOK_GROUP_ID
      console.log(ebookId)
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
          groups: [`${ebookId}`],
        })
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
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
    </Form>
  )
}
export default FormEbook;