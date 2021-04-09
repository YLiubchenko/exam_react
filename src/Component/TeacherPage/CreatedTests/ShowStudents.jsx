import React from "react";
import {randomKeyMap} from "../../js/randomKeyMap";

const ShowStudents = ({addedStudents}) => {

    const AllStudents = () => {
        const faculties = Object.keys(addedStudents);

        return faculties.map(faculty => {
            const courses = Object.keys(addedStudents[faculty]);

            return courses.map(course => {

                return addedStudents[faculty][course].map(el => {
                    return (
                        <div className='studentTableTest' key={randomKeyMap()}>
                            <div className='studentColumnTest'>{el}</div>
                            <div className='studentColumnTest'>{course}</div>
                            <div className='studentColumnTest'>{faculty}</div>
                        </div>
                    )
                })
            })
        })
    }


    return (
        <div>
            {addedStudents ?
                <div>
                    Students:
                    <div className='studentTableTest'>
                        <div className='studentColumnTest'><b>Email</b></div>
                        <div className='studentColumnTest'><b>Course</b></div>
                        <div className='studentColumnTest'><b>Faculty</b></div>
                    </div>

                    <AllStudents/>
                </div>
                : <div>
                    We have not yet added students to this test. First, click 'Add Students', and you'll be able to see
                    who's invited to this test.
                </div>
            }
        </div>
    )
}

export default ShowStudents;