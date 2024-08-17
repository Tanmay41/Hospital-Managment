"use client";

import {z} from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {createDoctor, editDoctor} from "@/api/doctor";
import {toast} from "@/components/ui/use-toast";
import {BadgeAlert, BadgeCheck} from "lucide-react";
import {Switch} from "@/components/ui/switch";
const formSchema = z.object({
    name: z.string(),
    mobile: z.string(),
    speciality: z.string().optional(),
    available: z.boolean().optional(),
})

interface Doctor {
    _id: string;
    name: string;
    mobile: string;
    speciality?: string;
    available?: boolean;
}

interface CreateDoctorProps {
    doctor?: Doctor;
}

export default function EditDoctor({ doctor }: CreateDoctorProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: doctor? doctor : {}
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await editDoctor({...values, id: doctor ? doctor._id : ""})
        if (result.success) {
            toast({description: (<div className={"flex items-center flex-row gap-3 text-green-500"}><BadgeCheck size={24}/><h1>Doctor edited successfully!</h1></div>)});
        }else {
            toast({description: (<div className={"flex items-center flex-row gap-3 text-red-500"}><BadgeAlert size={24}/><h1>Doctor can&apos;t be edited!</h1></div>)})
        }
    }

    return (
        <div className={"w-5/12 mx-auto border border-gray-500 p-7 rounded-lg pastel-shadow mt-16"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Doctor</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Enter Doctor's name"} {...field} />
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
                                <FormLabel>Mobile</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Enter Doctor's mobile number"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="speciality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Speciality</FormLabel>
                                <FormControl>
                                    <Input placeholder={"ex. cardiology"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Available
                                    </FormLabel>
                                    <FormDescription>
                                        Is doctor available for appointments?
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className={"pastel-shadow-responsive"} type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}