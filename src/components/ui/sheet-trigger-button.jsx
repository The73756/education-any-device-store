import { SheetTrigger } from './sheet'

export const SheetTriggerButton = ({ children, variant, className }) => {
  return (
    <SheetTrigger
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full hover:opacity-90 ${variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/900'} ${className}`}
    >
      {children}
    </SheetTrigger>
  )
}
