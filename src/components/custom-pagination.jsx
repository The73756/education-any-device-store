import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '@/main'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

export const CustomPagination = observer(({ props }) => {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let index = 0; index < pageCount; index++) {
    pages.push(index + 1)
  }

  return (
    <Pagination {...props} className={!pageCount && 'hidden'}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${device.page === 1 && 'opacity-50 pointer-events-none'}`}
            onClick={() => device.setPage(device.page - 1)}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={device.page === page}
              onClick={() => device.setPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={`${device.page === pageCount && 'opacity-50 pointer-events-none'}`}
            onClick={() => device.setPage(device.page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
})
