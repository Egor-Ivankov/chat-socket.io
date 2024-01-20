import React from 'react';
import {MessagesProps} from "../../types/form-types.ts";
import {nanoid} from "nanoid";
import styles from '../../styles/Messages.module.css';
const UsersMessages: React.FC<MessagesProps> = ({ messages, name}) => {
    return (
        <div className={styles.messages}>
            {messages.map(({user, message}) => {
                let itsMe;

                if(name) {
                    itsMe = user.name.toLowerCase().trim() === name.toLowerCase().trim();
                }

                const className = itsMe ? styles.me : styles.user;

                return (
                    <div key={nanoid()} className={`${styles.message} ${className}`}>
                        <p className={styles.user}>{user.name}</p>
                        <p className={styles.text}>{message}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default UsersMessages;