import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateForm from "./UpdateForm";
import FormResponses from "./FormResponses";
import CreateFormLayout from "@/layouts/CreateFormLayout";
import { addQuestion } from "@/features/FormSlice";
import { Card } from "@/components/ui/card";
import data from "@/fieldType.jsx";
import { useDispatch } from "react-redux";

function FormPreview() {
  const dispatch = useDispatch();
  return (
    <CreateFormLayout>
      <div className="w-4/5  p-5 min-h-screen flex justify-center">
        <div className="w-4/5   p-5 min-h-screen flex flex-col item-center">
      <Tabs defaultValue="table" className="">
        <TabsList className="flex justify-center">
          <TabsTrigger value="table" className="w-3/6">
            Table
          </TabsTrigger>
          <TabsTrigger value="response" className="w-3/6">
            Response
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <UpdateForm />
        </TabsContent>
        <TabsContent value="response">
          <FormResponses />
        </TabsContent>
          </Tabs>
        </div>
      </div>
      {<div className="w-1/5  bg-gray-500 bg-opacity-50">
        <div className="grid grid-cols-2  p-1 justify-items-center">
          {data.map((d, i) => (
            <Card
              key={i}
              className="h-[100px] w-[100px] flex flex-col items-center justify-center cursor-pointer shadow-2xl"
              onClick={() => dispatch(addQuestion({ type: d.value }))}
            >
              <div>{d.icon}</div>
              <div className="text-gray-700">{d.text}</div>
            </Card>
          ))}
        </div>
       
      </div>}
    </CreateFormLayout>
  );
}

export default FormPreview;
