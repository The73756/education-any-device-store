import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createType, fetchTypes } from '@/api/deviceApi'
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
import { Context } from '@/main'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Это поле обязательно!' }),
})

export const AddTypeForm = observer(() => {
  const { device } = useContext(Context)
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const addType = async (data) => {
    await createType(data)
  }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await addType(data)
      toast({
        title: 'Успешно!',
        description: 'Тип успешно добавлен',
      })
      await fetchTypes().then((data) => device.setTypes(data))
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка добавления',
        description: error.response.data.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип</FormLabel>
              <FormControl>
                <Input placeholder="Введите название типа" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  )
})
