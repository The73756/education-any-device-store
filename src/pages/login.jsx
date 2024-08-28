import { Header } from '@/components/header'
import { LoginForm } from '@/components/login-form'
import { RegForm } from '@/components/reg-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/toaster'

export const Login = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="flex justify-center my-8 items-center container">
          <Tabs defaultValue="authorization" className="w-3/5 max-md:w-full">
            <TabsList className="mb-8 w-full">
              <TabsTrigger className="w-full" value="authorization">
                Авторизация
              </TabsTrigger>
              <TabsTrigger className="w-full" value="registration">
                Регистрация
              </TabsTrigger>
            </TabsList>
            <TabsContent value="authorization">
              <LoginForm />
            </TabsContent>
            <TabsContent value="registration">
              <RegForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster duration={3000} />
    </>
  )
}
