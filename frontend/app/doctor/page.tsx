import DoctorCard from "@/components/doctor/Card";
import {getAllDoctors} from "@/api/doctor";

export default async function manageDoctors() {

    const doctors = await getAllDoctors()

    return (
        <main className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mx-7"}>
            {doctors.map((item: any, index: number) => {
                return <DoctorCard doctor={item} key={index}/>;
            })}
            <DoctorCard addCard={true}/>
        </main>
    )
}