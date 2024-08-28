import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { fetchBasketDevices } from '@/api/basketApi'
import { login } from '@/api/userApi'
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
import { HOME_ROUTE } from '@/utils/consts'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .email({ message: 'Неверный формат e-mail' }),
  password: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .min(8, { message: 'Пароль должен быть не менее 8 символов' }),
})

export const LoginForm = observer(() => {
  const { user, basket, order } = useContext(Context)
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const authorizate = async ({ email, password }) => {
    const response = await login(email, password)
    console.log(response)
    return response
  }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const userData = await authorizate({ ...data })
      user.setUser(userData)
      user.setIsAuth(true)
      const userBasket = await fetchBasketDevices(user.user.id)
      basket.setBasketDevices(userBasket)
      const allOrders = JSON.parse(localStorage.getItem('orders'))
      if (allOrders) {
        const userOrders = allOrders.find(
          (order) => order.userId === user.user.id,
        )
        if (userOrders) {
          order.setOrders(userOrders.userOrders)
        }
      }
      form.reset()
      navigate(HOME_ROUTE)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка авторизации',
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Введите Ваш e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите Ваш пароль"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="max-sm:text-[10px]" />
            </FormItem>
          )}
        />
        <Button type="submit">Войти</Button>
      </form>
    </Form>
  )
})
