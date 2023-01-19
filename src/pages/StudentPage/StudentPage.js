import React, {useState} from 'react';
import PopUp from "../../components/PopUp/PopUP";
function StudentPage() {
    const [buttonStudent,setButtonStudent] = useState(false)
    const [buttonMessage,setButtonMessage] = useState(false)
    const [buttonStudyGroup,setButtonStudyGroup] = useState(false)

    return (
        <>
           <section className="buttons-student">
            <button type="button"
                    onClick={() =>setButtonStudent(true)}
            >Huiswerk
            </button>
            <button type="button"
                    onClick={() => setButtonMessage(true)}
            >Berichten</button>
            <button type="button"
                    onClick={() => setButtonStudyGroup(true)}
            >Studie groep</button>
           </section>
         <PopUp trigger={buttonStudent} setTrigger={setButtonStudent}>
             <h2>Huiswerk</h2>
             {/*render hier de verschillende lessen vanuit de database*/}
         </PopUp>
         <PopUp trigger={buttonMessage} setTrigger={setButtonMessage}>
             <h2>Berichten</h2>
         </PopUp>
         <PopUp trigger={buttonStudyGroup} setTrigger={setButtonStudyGroup}>
             <h2>Studie groep</h2>
         </PopUp>
        </>
    );
}

export default StudentPage;