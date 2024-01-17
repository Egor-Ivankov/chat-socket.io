import React from 'react';
import {MessagesProps} from "../../types/form-types.ts";
import {nanoid} from "nanoid";
import classNames from "classnames";
import '../../styles/users-messages.scss';
const UsersMessages: React.FC<MessagesProps> = ({ messages, name}) => {
    const id = nanoid();
    return (
        <>
            {messages.map(({user, message}) => {
                let itsMe;

                if(name) {
                    itsMe = user.name.toLowerCase().trim() === name.toLowerCase().trim();
                }

                const messageClassName = classNames({'me': itsMe, 'not-me': !itsMe});

                return (
                    <div key={id} className="message">
                        <p className="message-username">{user.name}</p>
                        <p className={`message-${messageClassName}`}>{message}</p>
                    </div>
                )
            })}
        </>
    );
}

export default UsersMessages;