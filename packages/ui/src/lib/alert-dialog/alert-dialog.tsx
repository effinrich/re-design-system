// In Chakra UI v3, AlertDialog is just Dialog with role="alertdialog".
// Re-export the Dialog snippet components under AlertDialog names for backwards compat.
export {
  DialogRoot as AlertDialogRoot,
  DialogBody as AlertDialogBody,
  DialogCloseTrigger as AlertDialogCloseTrigger,
  DialogContent as AlertDialogContent,
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
  DialogBackdrop as AlertDialogBackdrop,
  DialogTitle as AlertDialogTitle,
  DialogDescription as AlertDialogDescription,
  DialogActionTrigger as AlertDialogActionTrigger,
  DialogTrigger as AlertDialogTrigger,
} from '../snippets/dialog'
