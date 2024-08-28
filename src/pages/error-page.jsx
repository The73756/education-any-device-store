import { useNavigate, useRouteError } from 'react-router-dom'
import { Header } from '@/components/header'
import { ErrorIcon } from '@/components/shared/error-icon'
import { Button } from '@/components/ui/button'
import { HOME_ROUTE } from '@/utils/consts'

export const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-8 my-8 mt-16 container">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-3xl">{error.status}</h1>
          <h2 className="font-semibold text-xl">{error.statusText}</h2>
        </div>
        <ErrorIcon width="120" />
        <Button onClick={() => navigate(HOME_ROUTE)}>
          Вернуться на главную
        </Button>
      </div>
    </>
  )
}
