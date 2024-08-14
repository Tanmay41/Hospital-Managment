"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {deleteAppointment, editAppointment} from "@/api/appointment";
import { useToast } from "@/components/ui/use-toast";
import {BadgeAlert, BadgeCheck, Pencil, Trash2, CirclePlus} from 'lucide-react';
import Link from "next/link"

// Define the types for props and event
interface Appointment {
    _id: string;
    doctor: { _id: string; name: string };
    patient: { _id: string; name: string };
    time: string;
    date: string;
    description: string;
    status: string;
    emergency: boolean;
}

interface AppointmentCardProps {
    appointment?: Appointment;
    addCard?: boolean;
}

export default function AppointmentCard({ appointment, addCard }: AppointmentCardProps) {
    const { toast } = useToast();

    if (appointment && !addCard) {
        const changeStatus = async (newStatus: string) => {
            toast((<div><BadgeAlert size={18}/><h1>Changing status...</h1></div>))

            const data = {
                appointmentID: appointment._id,
                doctorID: appointment.doctor._id,
                patientID: appointment.patient._id,
                status: newStatus
            };

            try {
                const result = await editAppointment(data);
                if (result.success) {
                    toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Status updated successfully!</h1></div>)});
                } else {
                    toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error changing status!</h1></div>)});
                }
            } catch (error) {
                toast(<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Unexpected error occurred!</h1></div>);
                console.error("Error updating appointment status:", error);
            }

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        };

        const handleDelete = async () => {
            if(!confirm('Are you sure you want to delete?')){
                return;
            }

            try {
                const res = await deleteAppointment(appointment._id);
                if (res.success){
                    toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Status updated successfully!</h1></div>)});
                }else {
                    toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error deleting appointment!</h1></div>)});
                }
            }catch (e){
                console.error('Error deleting appointment:', e);
                toast(<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Unexpected error occurred while deleting appointment!</h1></div>);
            }

            setTimeout(() => {
                window.location.reload()
            }, 500)
        }

        const cardClass = "h-[225px] pastel-shadow" + appointment.emergency ? "bg-red-100" : ""

        return (
            <Card className={cardClass}>
                <CardHeader className={"flex flex-row"}>
                    <div className={"flex justify-between flex-row w-full"}>
                        <div>
                            <CardTitle>{appointment.doctor.name} - {appointment.patient.name}</CardTitle>
                            <CardDescription>{appointment.time}</CardDescription>
                            <CardDescription>{formatDate(appointment.date)}</CardDescription>
                        </div>
                        <div className={"flex flex-row gap-3"}>
                            <Link href={"/appointment/edit/" + appointment._id}><Pencil className={"border border-gray-300 p-1 rounded-md hover:bg-blue-200 transition-all duration-500 active:scale-75"} size={32}/></Link>
                            <Trash2 onClick={handleDelete} className={"border border-gray-300 p-1 rounded-md hover:bg-red-200 transition-all duration-500 active:scale-75 cursor-pointer"} size={32}/>
                        </div>
                    </div>
                    <div>
                        <Link href={"/appointment/edit/" + appointment._id}></Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {appointment.description}
                </CardContent>
                <CardFooter className="flex flex-row gap-7">
                    <h1>Status: </h1>
                    <Select onValueChange={changeStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={appointment.status} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="over">Over</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </CardFooter>
            </Card>
        );
    }else {
        return (
            <Link href={"/appointment/create"} className={"h-[225px] flex justify-center items-center flex-col rounded-lg border bg-card text-card-foreground shadow-sm pastel-shadow-responsive"}>
                <CirclePlus size={100} strokeWidth={0.5} color={"#808080"} />
                <h1>Add Appointment</h1>
            </Link>
        );
    }
}
