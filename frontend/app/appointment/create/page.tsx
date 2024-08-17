import CreateAppointment from "@/components/appointment/CreateAppointment";
import {getPatients} from "@/api/patient";
import {getDoctors} from "@/api/doctor";

export default async function createAppointment() {

    const patients = await getPatients()
    const doctors = await getDoctors()

    return (
        <div className={"w-1/3 border border-gray-500 p-7 rounded-xl mx-auto pastel-shadow -mt-16"}>
            <CreateAppointment doctors={doctors} patients={patients}/>
        </div>
    )
}