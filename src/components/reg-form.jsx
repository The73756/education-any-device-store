import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registration } from '@/api/userApi'
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
import { Context } from '@/main'
import { HOME_ROUTE } from '@/utils/consts'
import { Checkbox } from './ui/checkbox'
import { useToast } from './ui/use-toast'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .max(50, { message: 'Слишком длинное имя' }),
  email: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .email({ message: 'Неверный формат e-mail' }),
  password: z
    .string()
    .min(1, { message: 'Это поле обязательно!' })
    .min(8, { message: 'Пароль должен быть не менее 8 символов' }),
  role: z.boolean(),
})

export const RegForm = observer(() => {
  const { user } = useContext(Context)
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: false,
    },
  })

  const registrate = async ({ name, email, password, role }) => {
    const response = await registration(name, email, password, role)
    console.log(response)
    return response
  }

  const onSubmit = async (data) => {
    console.log(data)
    if (data.role) {
      data.role = 'ADMIN'
    } else {
      data.role = 'USER'
    }
    try {
      const userData = await registrate({ ...data })
      user.setUser(userData)
      user.setIsAuth(true)
      form.reset()
      navigate(HOME_ROUTE)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка регистрации',
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
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="Введите Ваше имя" {...field} />
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
                  placeholder="Придумайте пароль"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Пароль должен быть не менее 8 символов
              </FormDescription>
              <FormMessage className="max-sm:text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">
                Зарегистрироваться как администратор
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </Form>
  )
})
