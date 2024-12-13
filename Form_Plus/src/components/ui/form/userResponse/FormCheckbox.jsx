import React from "react";
import {

    FormControl,
    
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "../../label";

function FormCheckbox({ question, form }) {
    return (
      <FormField
        key={question._id}
        control={form.control}
        name={question._id}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{question.title}</FormLabel>
            <FormControl>
              <div {...field}>
                {question.options?.map((option, index) => (
                  <>
                    <Checkbox
                      key={index}
                      {...field}
                      value={option}
                      // checked={field?.value?.includes(option)}
                      onCheckedChange={() => {
                        const newValue = field.value ?? [];
                        // Add or remove the option from the array
                        const updatedValue = newValue.includes(option)
                          ? newValue.filter((v) => v !== option) // Remove the option if already selected
                          : [...newValue, option]; // Add the option if not already selected

                        field.onChange(updatedValue);
                      }}
                    />
                    <Label className="ml-1.5">{option}</Label>
                    <br />
                  </>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );

//   return (
//         <FormField
//           control={question._id}
//           name={question._id}
//           render={() => (
//             <FormItem>
//               <div className="mb-4">
//                       <FormLabel className="text-base">{question.title}</FormLabel>
//               </div>
//               {question.options.map((option) => (
//                 <FormField
//                   key={option}
//                   control={form.control}
//                   name={option}
//                   render={({ field }) => {
//                     return (
//                       <FormItem
//                         key={option}
//                         className="flex flex-row items-start space-x-3 space-y-0"
//                       >
//                         <FormControl>
//                           <Checkbox
//                             // checked={field.value?.includes(item.id)}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? field.onChange([...field.value, item.id])
//                                 : field.onChange(
//                                     field.value?.filter(
//                                       (value) => value !== item.id,
//                                     ),
//                                   );
//                             }}
//                           />
//                         </FormControl>
//                         <FormLabel className="font-normal">
//                           {option}
//                         </FormLabel>
//                       </FormItem>
//                     );
//                   }}
//                 />
//               ))}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//   );
}

export default FormCheckbox;
