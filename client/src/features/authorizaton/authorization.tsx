import React, {useState} from "react";
import questionMark from '../../assets/question-mark.png';
import {Link} from "react-router-dom";
import {AuthorizationInputs} from "../../types/form-types.ts";
import '../../styles/authorization-page.scss';

const fields = {
    userName: 'userName',
    userRoom: 'userRoom',
}
function Authorization()  {
    const { userName, userRoom } = fields;

    const [values, setValues] = useState({[userName]: "", [userRoom]: ""});

    const handleChange: AuthorizationInputs = ({ target:  { value, name }}) => {
        setValues({...values, [name]: value});
    }

    const handleClick = (e: React.FormEvent) => {
        const isDisabled = Object.values(values).some(value => !value);

        if(isDisabled) e.preventDefault();
        console.log(isDisabled)
    }

    return (
        <section className="authorization-container">
            <h2 className="authorization-container-header">Hi, there!</h2>
            <img src={questionMark} className="authorization-container-question" alt="question-mark"/>
            <form className="authorization-container-form">
                <input
                    type="text"
                    className="authorization-container-form-input"
                    placeholder="Enter your nickname"
                    name="userName"
                    value={values[userName]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <input
                    type="text"
                    className="authorization-container-form-input"
                    placeholder="Enter room-name"
                    name="userRoom"
                    value={values[userRoom]}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                    <Link to={`/chat?name=${values[userName]}&room=${values[userRoom]}`}
                          className="authorization-container-form-link">
                            <button onClick={handleClick} className="authorization-container-form-link-button">
                                    Sign in
                            </button>
                    </Link>
            </form>
        </section>
    );
}

export default Authorization;