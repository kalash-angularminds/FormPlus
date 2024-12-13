import FormBanner from "@/components/custom/FormBanner";
import FormField from "@/components/custom/FormField";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addQuestion, setInitialState } from "@/features/FormSlice";
import data from "@/fieldType.jsx";
import { useToast } from "@/hooks/use-toast";
import CreateFormLayout from "@/layouts/CreateFormLayout";
import axios from "axios";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export function Example() {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.form.questions);
    const formTitle = useSelector((state) => state.form.title);
    const formDescription = useSelector((state) => state.form.description);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formTitle) {
            toast({
                title: "Enter Title",
                description: "Title is required",
                 variant: 'destructive',
            });
            return;
        }

        if (questions.length <= 0) {
            toast({
                title: "Add Question",
                description: "Question is required",
                variant: 'destructive',
            });
            return;
        }

        const missingTitle = questions.some(question => !question.title || question.title.trim() === "");

        if (missingTitle) {
            toast({
                title: "Missing Title",
                description: "All questions must have a title",
                variant: 'destructive',
            });
            return;
        }

        const payload = {
            title: formTitle,
            description: formDescription,
            questions,
        };
        console.log("payload: ", payload);
        try {
            const response = await axios.post(
                `http://localhost:5000/api/v1/form/create-form`,
                payload,
            );
            console.log("response: ", response);
            if (response?.status === 201) {
                navigator.clipboard.writeText(`http://localhost:5173/form/${response?.data.data._id}`); 
                toast({
                    title: "Form Created",
                    description: "Form link copied to clipboard"
                });
                navigate("/");
            }
        } catch (error) {
            console.log("Error creating form: ", error);
        }
    }

    useEffect(() => {
        const payload = {
            title: "",
            description: "",
            questions: [],
        };

        dispatch(setInitialState(payload));
    }, []);
    return (
        <>
            <CreateFormLayout>
                <div className="w-4/5  p-5 min-h-screen flex justify-center">
                    <div className="w-4/5   p-5 min-h-screen flex flex-col item-center">
                        <FormBanner />
                        {questions.map((question, index) => (
                            <FormField key={index} index={index} />
                        ))}
                        <Button className="text-2xl" type="submit" onClick={handleSubmit}>
                            Create Form
                        </Button>
                    </div>
                </div>
                <div className="w-1/5  bg-gray-500 bg-opacity-50">
                    <div className="grid grid-cols-2  p-1 justify-items-center">
                        {data.map((d, i) => (
                            <Card
                                key={i}
                                className="h-[100px] w-[100px] flex flex-col items-center justify-center cursor-pointer shadow-2xl bg-slate-800 text-white border-0"
                                onClick={() => dispatch(addQuestion({ type: d.value }))}
                            >
                                <div>{d.icon}</div>
                                <div className="text-gray-400">{d.text}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </CreateFormLayout>
        </>
    );
}
