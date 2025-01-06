import { getClassroomOptions } from '@/app/functions/classrooms/Classrooms';
import ClassroomDisplay from '@/components/ClassroomDisplay';


const ClassroomCheck = async () => {
    const options = await getClassroomOptions();

    return (
        <ClassroomDisplay options={options} />
    );
}


export default ClassroomCheck;