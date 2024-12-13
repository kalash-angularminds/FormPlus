import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from 'react-redux'
import { setDescription, setTitle } from '@/features/FormSlice';

function FormBanner() {
    const title = useSelector(state => state.form.title);
    const description = useSelector(state => state.form.description);
    const dispatch = useDispatch();
    function handleTitleChange(e) {
        e.preventDefault();
        dispatch(setTitle(e.target.value));
    }
    function handleDescriptionChange(e) {
        e.preventDefault();
        dispatch(setDescription(e.target.value));
    }
  return (
      <Card>
          <CardHeader>
              <input className="h-12 flex w-full rounded-md border-b-2  px-3 py-2 bg-transparent  text-3xl text-center" id="form_title" placeholder="Form Title" required value={title} onChange={handleTitleChange}/>
          </CardHeader>
          <CardContent>
              <Textarea row={2} placeholder="Form description" value={description} onChange={handleDescriptionChange} />
          </CardContent>
      </Card>
  )
}

export default FormBanner