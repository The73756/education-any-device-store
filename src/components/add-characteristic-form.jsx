import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Это поле обязательно!' }),
  description: z.string().min(1, { message: 'Это поле обязательно!' }),
})

export const AddCharacteristicForm = ({ prevChars, setChars }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    if (!prevChars.some((char) => char.title === data.title))
      setChars([...prevChars, data])
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите название характеристики"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите описание характеристики"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Добавить
        </Button>
      </form>
    </Form>
  )
}
