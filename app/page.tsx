import Carousel from "./components/Carousel";
import ExecutiveMembersSection from "./components/Members";
import President from "./components/President";
import TopFacilities from "./components/TopFacilities";

export default function Home() {
  return (
    <>
    <Carousel />
    <TopFacilities />
    <President />
    <ExecutiveMembersSection />
    </>
  );
}
