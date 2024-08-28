import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deleteBrand, fetchBrands } from '@/api/deviceApi'
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
  brand: z.string().min(1, { message: 'Это поле обязательно!' }),
})

export const DeleteBrandForm = () => {
  const { toast } = useToast()
  const { device } = useContext(Context)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: '',
    },
  })

  const removeBrand = async (id) => {
    await deleteBrand(id)
  }

  const onSubmit = async (data) => {
    console.log(data)
    const brand = device.brands.find((brand) => brand.name === data.brand)
    try {
      await removeBrand(brand.id)
      toast({
        title: 'Успешно!',
        description: 'Бренд успешно удален',
      })
      await fetchBrands().then((data) => device.setBrands(data))
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
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Бренд</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Выберите бренд устройства"
                      value={field.value}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {device.brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
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
