"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {toast} from "@/components/ui/use-toast";
import {BadgeAlert, BadgeCheck} from "lucide-react";
import {createPatient} from "@/api/patient";

const formSchema = z.object({
    name: z.string().min(2),
    mobile: z.string(),
    address: z.string().min(5),
    age: z.string(),
    gender: z.boolean()
})

export default function CreatePatientForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur"
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // @ts-ignore
            const response = await createPatient({age: toString(values.age), ...values})
            if (response.success) {
                toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Patient edited!</h1></div>)});
            } else {
                toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error editing patient!</h1></div>)});
            }
        }catch(error) {
            console.log("Error editing patient: " + error);
            toast({description: (
                    <div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18}/><h1>Unexpected error
                        occurred while editing patient!</h1></div>)
            });
        }
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div className={"w-1/2 mx-auto border border-gray-500 rounded-xl p-7"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. Hong Ortiz" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Contact</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. +91 793-1943-504" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. 9159 Walsh Flats, Dorothystad, KS 73543" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient&apos;s Age</FormLabel>
                                <FormControl>
                                    <Input type={"number"} placeholder="ex. 21" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Patient&apos;s Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        // @ts-ignore
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                {/*@ts-ignore*/}
                                                <RadioGroupItem value={false} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Male
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                {/*@ts-ignore*/}
                                                <RadioGroupItem value={true} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Female
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
