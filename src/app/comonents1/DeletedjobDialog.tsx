'use client'
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/action/jobs"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/toast"

export function DeletedJobdailog({job,  onDelete,}: {job:JobPost;  onDelete: (id: string) => void;}) {

const [open, setOpen] = useState(false)
const router = useRouter()

const handleDelete = async () => {
  try {
    const res = await deleteJob(job._id)

    if (res.deletedCount > 0) {
      setOpen(false)
      toast.add({
  title: "job delted",
  description: "The job has been  permanently deleted",
})
      router.refresh()
      
    }
  } catch (error) {
    console.log("Delete Error:", error)
  }
}

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive">   <Trash2Icon /></Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
         
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={handleDelete}
           variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
