"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link";
import {BadgeAlert, BadgeCheck, CirclePlus, Pencil, Trash2} from "lucide-react";
import {deleteDoctor, editDoctor} from "@/api/doctor";
import {toast} from "@/components/ui/use-toast";

interface Doctor{
    _id: string;
    name: string;
    mobile: string;
    speciality: string;
    available: boolean;
}

interface DoctorCardProps {
    doctor?: Doctor;
    addCard?: boolean;
}

export default function DoctorCard({ doctor, addCard }: DoctorCardProps) {
    if (doctor && !addCard) {

        const handleDelete = async () => {
            if (!confirm("Are you sure you want to delete"))
                return;

            try {
                const response = await deleteDoctor({id: doctor._id})
                if (response.success) {
                    toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Doctor deleted successfully!</h1></div>)});
                } else {
                    toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error deleting doctor!</h1></div>)});
                }
            }catch(error) {
                toast(<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Unexpected error occurred!</h1></div>);
                console.error("Error deleting doctor:", error);
            }
        }

        const handleChange = async () => {
            try {
                const response = await editDoctor({id: doctor._id, available:!doctor.available})
                if (response.success) {
                    window.location.reload();
                    toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Availability updated successfully!</h1></div>)});
                } else {
                    toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error changing availability!</h1></div>)});
                }
            }catch(error) {
                toast(<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Unexpected error occurred!</h1></div>);
                console.error("Error changing availability:", error);
            }
        }

        return (
            <Card className={"pastel-shadow"}>
                <CardHeader className={"flex justify-between flex-row"}>
                    <div>
                        <CardTitle>{doctor.name}</CardTitle>
                        <CardDescription>{doctor.speciality}</CardDescription>
                    </div>
                    <div className={"flex flex-row gap-3"}>
                        <Link href={"/doctor/edit/" + doctor._id}>
                            <Pencil
                            className={"border border-gray-300 p-1 rounded-md hover:bg-blue-200 transition-all duration-500 active:scale-75"}
                            size={32}
                            />
                        </Link>
                        <Trash2
                            onClick={handleDelete}
                            className={"border border-gray-300 p-1 rounded-md hover:bg-red-200 transition-all duration-500 active:scale-75 cursor-pointer"}
                            size={32}
                        />
                    </div>
                </CardHeader>
                <CardContent className={"flex flex-row gap-1"}>
                    Contact: <p>{doctor.mobile}</p>
                </CardContent>
                <CardFooter>
                    <p className={"flex flex-row gap-1"}>Available: <Switch onCheckedChange={handleChange} checked={doctor.available}/></p>
                </CardFooter>
            </Card>

        )
    }else {
        return (
            <Link href={"/doctor/create"} className={"h-[225px] flex justify-center items-center flex-col rounded-lg border bg-card text-card-foreground shadow-sm pastel-shadow-responsive"}>
                <CirclePlus size={100} strokeWidth={0.5} color={"#808080"} />
                <h1>Add Doctor</h1>
            </Link>
        )
    }
}