import EditAppointment from "@/components/EditAppointment";
import {getDoctors} from "@/api/doctor";
import {getPatients} from "@/api/patient";
import {getOneAppointment} from "@/api/appointment";
import {AspectRatio} from "@/components/ui/aspect-ratio";

export default async function editAppointment({params}: any) {

    const appointment = await getOneAppointment(params.id);
    const patients = await getPatients()
    const doctors = await getDoctors()

    const defaultValues = {
        patientID: appointment.patient._id,
        doctorID: appointment.doctor._id,
        date: appointment.date,
        time: appointment.time,
        description: appointment.description,
        emergency: appointment.emergency,
    }

    return (
        <div className={"w-1/3 border border-gray-500 p-7 rounded-xl mx-auto pastel-shadow"}>
            <EditAppointment
                appointmentID={params.id}
                defaultValues={defaultValues}
                patients={patients}
                doctors={doctors}
            />
        </div>
    )
}