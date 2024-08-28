import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createDevice, fetchDevices } from '@/api/deviceApi'
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
import { AddCharacteristicForm } from './add-characteristic-form'
import { AdminModal } from './admin-modal'
import { CharacteristicItem } from './characteristic-item'
import { FileInput } from './file-input'
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
  brand: z.string().min(1, { message: 'Это поле обязательно!' }),
  name: z.string().min(1, { message: 'Это поле обязательно!' }),
  description: z.string().min(1, { message: 'Это поле обязательно!' }),
  price: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: 'Цена должна быть больше нуля!',
    }),
})

export const AddDeviceForm = observer(() => {
  const { device } = useContext(Context)
  const { toast } = useToast()
  const [files, setFiles] = useState([])
  const [characteristics, setCharacteristics] = useState([])
  const [cleanFileInput, setCleanFileInput] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      brand: '',
      name: '',
      price: '',
      description: '',
    },
  })

  const addDevice = async (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', `${data.price}`)
    formData.append('typeId', data.type.id)
    formData.append('brandId', data.brand.id)
    formData.append('info', JSON.stringify(data.info))
    data.photos.forEach((file) => {
      formData.append('img', file)
    })
    await createDevice(formData)
  }

  const onSubmit = async (data) => {
    console.log(data)
    const type = device.types.find((type) => type.name === data.type)
    const brand = device.brands.find((brand) => brand.name === data.brand)
    const newData = {
      ...data,
      type,
      brand,
      photos: [...files],
      info: [...characteristics],
    }
    try {
      await addDevice(newData)
      toast({
        title: 'Успешно!',
        description: 'Устройство успешно добавлено',
      })
      await fetchDevices({}).then((data) => device.setDevices(data.rows))
      form.reset()
      setFiles([])
      setCharacteristics([])
      setCleanFileInput(true)
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
        className="flex flex-col gap-8 w-full"
      >
        <div className="flex flex-col gap-4 w-full">
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
                    <SelectTrigger className="text-left">
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
                    <SelectTrigger className="text-left">
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название устройства" {...field} />
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
                  <Input placeholder="Опишите устройство" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Введите цену устройства"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Изображения</FormLabel>
                <FormControl>
                  <FileInput
                    cleanInput={cleanFileInput}
                    setCleanInput={setCleanFileInput}
                    prevFiles={files}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormLabel>Характеристики</FormLabel>
            <div className="flex flex-wrap items-center gap-4">
              {characteristics.map((char) => (
                <CharacteristicItem
                  key={char.title}
                  char={char}
                  characteristics={characteristics}
                  setCharacteristic={setCharacteristics}
                />
              ))}
            </div>
            <AdminModal
              title="Добавить характеристику"
              form={
                <AddCharacteristicForm
                  prevChars={characteristics}
                  setChars={setCharacteristics}
                />
              }
            />
          </div>
        </div>
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  )
})
