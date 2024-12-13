import DashCard from "@/components/ui/dash/DashCard";
import { BASE_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import {  FilePlus2 } from "lucide-react";
import Navbar from "@/components/custom/Navbar";


function Dashboard() {
  const [allForms, setAllForms] = useState([]);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  async function getForms() {
    try {
      const response = await axios.get(`${BASE_URL}/forms`);
      console.log("response getting forms", response);
      setAllForms(response.data.data);
    } catch (error) {
      console.log("Error getting form: ", error);
    }
  }
  useEffect(() => {
    getForms();
    console.log("here", allForms);
  }, [change]);

  return (
    <>
      <div className=" p-4 text-grey-900 shadow-md md:p-6">
        <div className="container mx-auto flex flex-col items-center justify-center md:flex-row">
          <span className="flex mb-4 text-xl  font-bold md:mb-0">
            FormPlus <span><FilePlus2 size={30} /></span>
          </span>

        </div>
      </div>
    <div className="mx-4 my-8 w-full max-w-6xl rounded bg-white p-6 md:mx-8 lg:mx-auto">
        <h1 className="mb-4 text-white text-4xl font-bold bg-gray-600 p-4">User Dashboard</h1>
      <Separator />
        <div className="mt-4 grid  gap-2  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <Card className="w-[300px] h-[200px] cursor-pointer" onClick={() => navigate(`/form/create-form`)}>
          
          <CardContent className="flex h-full justify-center items-center">
            <span className="text-xl text-blue-500"><FilePlus2 size={64}/></span>
          </CardContent>
         
        </Card>

        {allForms?.map((form) => (
          <DashCard form={form} key={form._id} setChange={setChange} />
        ))}
      </div>
      </div>
    </>
  );
}

export default Dashboard;
