import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { deleteBasketDevice, fetchBasketDevices } from '@/api/basketApi'
import { Header } from '@/components/header'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createOrder } from '@/lib/create-order'
import { formatPrice } from '@/lib/price-format'
import { Context } from '@/main'
import { ADDRESSES, HOME_ROUTE, ORDERS_ROUTE } from '@/utils/consts'

const formSchema = z.object({
  address: z.string().min(1, { message: 'Это поле обязательно!' }),
  name: z.string().min(1, { message: 'Это поле обязательно!' }),
  email: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .email({ message: 'Неверный формат e-mail' }),
})

export const Purchase = observer(() => {
  const { basket, user } = useContext(Context)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      name: user.user.name,
      email: user.user.email,
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
    const orderDevices = []
    basket.basketDevices.forEach((device) =>
      orderDevices.push({ id: device.deviceId, count: device.count }),
    )

    const newData = {
      ...data,
      totalPrice: basket.basketTotalPrice,
      devices: orderDevices,
      createdAt: new Date(),
      status: 'Создан',
    }

    createOrder(newData, user.user.id)
    form.reset()
    setOpen(true)

    try {
      basket.basketDevices.forEach(async (device) => {
        await deleteBasketDevice({ id: device.id })
      })
      const updatedBasketDevices = await fetchBasketDevices(user.user.id)
      basket.setBasketDevices(updatedBasketDevices)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="items-start gap-8 grid grid-cols-5 max-md:grid-cols-4 my-8 container">
          <div className="flex flex-col flex-grow gap-4 max-[1230px]:order-last col-span-1 max-[1230px]:col-span-2 max-md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Оформить заказ</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <p>Стоимость: </p>
                  <p className="font-medium">
                    {formatPrice(basket.basketTotalPrice)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger className="w-full">
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      className="w-full h-auto whitespace-wrap"
                    >
                      Оформить заказ
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Успешно</AlertDialogTitle>
                      <AlertDialogDescription>
                        Спасибо за заказ!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => navigate(HOME_ROUTE)}>
                        На главную
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => navigate(ORDERS_ROUTE)}>
                        Перейти к заказам
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col gap-4 col-span-4 max-[1230px]:col-span-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8 w-full"
              >
                <div className="flex flex-col gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Адрес получения</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-left">
                              <SelectValue
                                placeholder="Выберите адрес магазина для самовывоза"
                                value={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ADDRESSES.map((address) => (
                              <SelectItem
                                key={address.id}
                                value={address.value}
                              >
                                {address.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          На данный момент доступен только самовывоз
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя получателя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите имя получателя"
                            {...field}
                          />
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
                        <FormLabel>E-mail получателя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите e-mail получателя"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          E-mail нужен для отправки кода получения
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <div className="flex flex-col gap-4">
              <h3>Товары в заказе</h3>
              <div className="flex gap-4">
                {basket.basketDevices.map((device) => (
                  <div
                    key={device.id}
                    className="flex-shrink-0 rounded-sm w-32 max-sm:w-24 h-32 max-sm:h-24 overflow-hidden aspect-square"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${device.device.photos[0].url}`}
                      alt={device.device.name}
                      className="h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
