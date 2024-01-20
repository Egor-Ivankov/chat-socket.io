import React, {useState} from "react";
import questionMark from '../../assets/question-mark.png';
import QuestionModal from "../question-modal/question-modal.tsx";
import {Link} from "react-router-dom";
import {AuthorizationInputs} from "../../types/form-types.ts";
import styles from '../../styles/Authorization.module.css';

const fields = {
    userName: 'userName',
    userRoom: 'userRoom',
}
function Authorization()  {
    const { userName, userRoom } = fields;

    const [values, setValues] = useState({[userName]: "", [userRoom]: ""});
    const [isViewModal, setIsViewModal] = useState(false);

    const handleChange: AuthorizationInputs = ({ target:  { value, name }}) => {
        setValues({...values, [name]: value});
    }

    const handleClick = (e: React.FormEvent) => {
        const isDisabled = Object.values(values).some(value => !value);

        if(isDisabled) e.preventDefault();
    }

    return (
        <section className={styles.container} onClick={() => setIsViewModal(false)}>

            <h2 className={styles.header}>Hi, there!</h2>

            <img src={questionMark} 
                className={styles.question}
                alt="question-mark" 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsViewModal(!isViewModal);
                }}
            />

            <form className={styles.form}>

                <input
                    type="text"
                    className={styles.inputs}
                    placeholder="Enter your nickname"
                    name="userName"
                    value={values[userName]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                <input
                    type="text"
                    className={styles.inputs}
                    placeholder="Enter room-name"
                    name="userRoom"
                    value={values[userRoom]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                <Link to={`/chat?name=${values[userName]}&room=${values[userRoom]}`}
                    className={styles.link}>
                        <button onClick={handleClick} className={styles.signIn}>
                                Sign in
                        </button>
                </Link>
            </form>
            {
                isViewModal 
                    ? <QuestionModal/> 
                    : null
            }
        </section>
    );
}

export default Authorization;