import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BasketList } from '@/components/basket-list'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatPrice } from '@/lib/price-format'
import { Context } from '@/main'
import { PURCHASE_ROUTE } from '@/utils/consts'

export const Basket = observer(() => {
  const { basket } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <h2 className="mt-8 font-semibold text-3xl container">Корзина</h2>
      <div className="gap-8 grid grid-cols-5 my-8 container">
        <div className="flex flex-col flex-grow gap-4 col-span-1 max-[1230px]:col-span-2 max-md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Оформить заказ</CardTitle>
            </CardHeader>
            {basket.basketTotalCount > 0 ? (
              <CardContent className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <p>Выбрано товаров: </p>
                  <p className="font-medium">{basket.basketTotalCount}</p>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <p>Стоимость: </p>
                  <p className="font-medium">
                    {formatPrice(basket.basketTotalPrice)}
                  </p>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <p className="font-medium">Корзина пуста</p>
              </CardContent>
            )}
            <CardFooter>
              <Button
                disabled={basket.basketTotalCount === 0}
                className="w-full h-auto whitespace-wrap"
                onClick={() => navigate(PURCHASE_ROUTE)}
              >
                Перейти к оформлению
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-4 max-[1230px]:col-span-5">
          <BasketList />
        </div>
      </div>
    </div>
  )
})
