import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { fetchBasketDevices } from '@/api/basketApi'
import { deleteDevice, fetchDevices } from '@/api/deviceApi'
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
  name: z.string().min(1, { message: 'Это поле обязательно!' }),
})

export const DeleteDeviceForm = () => {
  const { toast } = useToast()
  const { device, user, basket } = useContext(Context)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const removeDevice = async (id) => {
    await deleteDevice(id)
  }

  const onSubmit = async (data) => {
    console.log(data)
    const findDevice = device.devices.find(
      (device) => device.name === data.name,
    )
    try {
      await removeDevice(findDevice.id)
      toast({
        title: 'Успешно!',
        description: 'Устройство успешно удалено',
      })
      await fetchDevices().then((data) => device.setDevices(data.rows))
      await fetchBasketDevices(user.user.id).then((data) => {
        basket.setBasketDevices(data)
      })
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка удаления',
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
              <FormLabel>Название</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Выберите устройство"
                      value={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {device.devices.map((device) => (
                    <SelectItem key={device.id} value={device.name}>
                      {device.name}
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
