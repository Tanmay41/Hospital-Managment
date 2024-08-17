import {getOneDoctor} from "@/api/doctor";
import EditDoctor from "@/components/doctor/EditDoctor";

export default async function page({params}: any) {
    const doctor = await getOneDoctor(params.id)
    return <EditDoctor doctor={doctor} />
}