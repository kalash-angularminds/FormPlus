import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Files, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constants";
import { useToast } from "@/hooks/use-toast";

function DashCard({ form, setChange }) {
  const { title, description, createdAt, _id, questions } = form;
  const { toast } = useToast();
  const navigate = useNavigate();
  async function deleteForm() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/form/${_id}`,
        { questionId: questions._id },
      );
      console.log("delete response: ", response);
      if (response?.status === 201) {
        setChange((prev) => !prev);
        console.log("success");
      }
    } catch (error) {
      console.log("Error creating form: ", error);
    }
  }
  function copyLink() {
    navigator.clipboard.writeText(`http://localhost:5173/form/${_id}`);
    toast({
      title: "URL copied",
      description: "Form url has been copied to clipboard",
    });
  }
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex-col">
        <CardTitle className="flex flex-row gap-2">
          {title}{" "}
          <span className="cursor-pointer" onClick={copyLink}>
            <Files />
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex justify-center">
          <span>{new Date(createdAt).toLocaleString()}</span>
          <Button
            variant="outline"
            onClick={() => navigate(`/form/preview/${_id}`)}
          >
            Preview
          </Button>
        </div>
        <span
          className="text-red-500 cursor-pointer  flex items-center justify-center"
          onClick={deleteForm}
        >
          <Trash2 size={25} />
        </span>
      </CardFooter>
    </Card>
  );
}

export default DashCard;
