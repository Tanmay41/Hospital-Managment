import {getPatients} from "@/api/patient";
import PatientCard from "@/components/patient/Card";

export default async function page() {

    const patients = await getPatients()

    return (
        <main className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mx-7"}>
            {patients.map((item: any, index: number) => {
                return <PatientCard patient={item} key={index} />
            })}
            <PatientCard addCard={true} />
        </main>
    )
}