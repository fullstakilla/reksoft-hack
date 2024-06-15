import { MyResume } from "@/widgets/my-resume";
import { useOutletContext } from "react-router-dom";

const MyResumesPage = () => {
    const {refreshData} = useOutletContext<any>()

    return (
        <MyResume refreshData={refreshData}/>
    )
}

export default MyResumesPage;