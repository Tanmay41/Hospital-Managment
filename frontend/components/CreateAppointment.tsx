"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, BadgeCheck, BadgeAlert, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {toast} from "@/components/ui/use-toast";
import {Textarea} from "@/components/ui/textarea";
import {createAppointment} from "@/api/appointment";

const timeRegex = /^(0[9]|1[0-9]|20):(00|30)$/;

const formSchema = z.object({
    doctorID: z.string(),
    patientID: z.string(),
    date: z.any(),
    time: z.string().regex(timeRegex, "time should be in format HH:MM and satisfy regex => /^(0[9]|1[0-9]|20):(00|30)$/"),
    description: z.string().optional(),
    emergency: z.boolean().optional(),
});

// @ts-ignore
export default function CreateAppointment({ doctors, patients }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    async function onSubmit() {
        console.log(form.getValues());
        const values = {...form.getValues()}
        const result = await createAppointment(values);
        if (result.success) {
            toast({description: (<div className={"flex items-center flex-row gap-3 text-green-500"}><BadgeCheck size={24}/><h1>Appointment created successfully!</h1></div>)});
        }else {
            toast({description: (<div className={"flex items-center flex-row gap-3 text-red-500"}><BadgeAlert size={24}/><h1>Appointment can&apos;t be created!</h1></div>)})
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="doctorID"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Doctor</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? doctors.find(
                                                    (doctor: any) => doctor._id === field.value
                                                )?.name
                                                : "Select doctor"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Doctors..." />
                                        <CommandList>
                                            <CommandEmpty>No doctor found.</CommandEmpty>
                                            <CommandGroup>
                                                {doctors.map((doctor: any) => (
                                                    <CommandItem
                                                        value={doctor._id}
                                                        key={doctor._id}
                                                        onSelect={() => {
                                                            form.setValue("doctorID", doctor._id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                doctor._id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {doctor.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="patientID"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Patient</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? patients.find(
                                                    (patient: any) => patient._id === field.value
                                                )?.name
                                                : "Select patient"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Patients..." />
                                        <CommandList>
                                            <CommandEmpty>No patient found.</CommandEmpty>
                                            <CommandGroup>
                                                {patients.map((patient: any) => (
                                                    <CommandItem
                                                        value={patient._id}
                                                        key={patient._id}
                                                        onSelect={() => {
                                                            form.setValue("patientID", patient._id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                patient._id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {patient.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                                <Input placeholder="Type time in format HH:MM" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description to help the team" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emergency"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Emergency
                                </FormLabel>
                                <FormDescription>
                                    Is it an emergency?
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
    );
}