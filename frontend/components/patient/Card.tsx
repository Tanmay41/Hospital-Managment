"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import {BadgeAlert, BadgeCheck, CirclePlus, Pencil, Trash2} from "lucide-react";
import {deletePatient} from "@/api/patient";
import {toast} from "@/components/ui/use-toast";

interface Patient {
    _id: string;
    name: string;
    mobile: string;
    address: string;
    age: number;
    gender: boolean;
}

interface PatientCardProps {
    patient?: Patient;
    addCard?: boolean;
}

export default function PatientCard({patient, addCard}: PatientCardProps) {

    if (patient && !addCard) {
        const handleDelete = async () => {
            if (!confirm("Are you sure you want to delete this patient?")) {
                return;
            }

            try {
                const response = await deletePatient(patient._id)
                if (response.success) {
                    toast({description: (<div className={"flex flex-row gap-3 text-green-500"}><BadgeCheck size={18}/><h1>Patient Deleted!</h1></div>)});
                } else {
                    toast({description: (<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Error deleting patient!</h1></div>)});
                }
            }catch (error) {
                console.error("Error deleting patient:", error);
                toast(<div className={"flex flex-row gap-3 text-red-500"}><BadgeAlert size={18} /><h1>Unexpected error occurred while deleting patient!</h1></div>);
                return;
            }

            window.location.reload()
        }

        return (
            <Card className={"pastel-shadow"}>
                <CardHeader className={"flex justify-between flex-row"}>
                    <div>
                        <CardTitle>{patient.name}</CardTitle>
                        <CardDescription>{patient.age} - {patient.gender ? "F" : "M"}</CardDescription>
                    </div>
                    <div className={"flex flex-row gap-3"}>
                        <Link href={"/patient/edit/" + patient._id}>
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
                <CardContent>
                    <p>Mobile: {patient.mobile}</p>
                </CardContent>
                <CardFooter>
                    <p>{patient.address}</p>
                </CardFooter>
            </Card>
        )
    }else {
        return (
            <Link href={"/patient/create"} className={"h-[225px] flex justify-center items-center flex-col rounded-lg border bg-card text-card-foreground shadow-sm pastel-shadow-responsive"}>
                <CirclePlus size={100} strokeWidth={0.5} color={"#808080"} />
                <h1>Add Patient</h1>
            </Link>
        )
    }
}