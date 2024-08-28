import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { SheetTriggerButton } from './ui/sheet-trigger-button'

export const AdminModal = ({ title, form, variant }) => {
  return (
    <Sheet>
      <SheetTriggerButton variant={variant}>{title}</SheetTriggerButton>
      <SheetContent side="bottom">
        <div className="flex flex-col items-center gap-4 container">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="w-3/5 max-md:w-full">{form}</div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
