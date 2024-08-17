import {EditPatientForm} from "@/components/patient/EditPatient";
import {getOnePatient} from "@/api/patient";

export default async function page({params}: any) {

    const patient = await getOnePatient(params.id)

    return <EditPatientForm patient={patient} />
}