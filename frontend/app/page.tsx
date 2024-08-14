import {getAppointments} from "@/api/appointment";
import AppointmentCard from "@/components/appointment/Card";

export default async function Home() {

  const appointments = await getAppointments();

  return (
    <main className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mx-7"}>
      {appointments.map((item: any, index: number) => {
        return <AppointmentCard appointment={item} key={index} />;
      })}
      <AppointmentCard addCard={true} />
    </main>
  );
}
