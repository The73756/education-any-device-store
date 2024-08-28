import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deleteType, fetchTypes } from '@/api/deviceApi'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Context } from '@/main'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
  type: z.string().min(1, { message: 'Это поле обязательно!' }),
})

export const DeleteTypeForm = () => {
  const { toast } = useToast()
  const { device } = useContext(Context)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
    },
  })

  const removeType = async (id) => {
    await deleteType(id)
  }

  const onSubmit = async (data) => {
    console.log(data)
    const type = device.types.find((type) => type.name === data.type)
    try {
      await removeType(type.id)
      toast({
        title: 'Успешно!',
        description: 'Тип успешно удален',
      })
      await fetchTypes().then((data) => device.setTypes(data))
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка удаления',
        description: error.response?.data.message,
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Выберите тип устройства"
                      value={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {device.types.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Удалить</Button>
      </form>
    </Form>
  )
}
