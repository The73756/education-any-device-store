import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '@/main'

export const RequireAuth = observer(({ children, admin }) => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    if (admin) {
      if (user.user.role !== 'ADMIN') return navigate(-1)
    } else if (!user.isAuth) return navigate(-1)

    setLoading(false)
    setChecked(true)
  }, [])

  if (loading) return <></>
  if (checked) return <>{children}</>
})
