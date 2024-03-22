'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Divide, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.',
  // }),
})

export default function SearchBox() {
  // ...
  const form = useForm()

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <FormField
            name=""
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>{label}</FormLabel> */}
                <FormControl>
                  <Input placeholder="Search..." {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
