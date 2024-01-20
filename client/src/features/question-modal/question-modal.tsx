import { createPortal } from "react-dom";
import styles from '../../styles/Question-modal.module.css';

export default function QuestionModal() {
    return (
        <>
            {createPortal(
                    <section className={styles.modal}>
                            <h3 className={styles.header}>To the enter the chat</h3>
                        <ul className={styles.list}>
                            <li className={styles.li}>1- enter your nickname in the first field;</li>
                            <li className={styles.li}>2- enter the name of the room in the second field;</li>
                            <li className={styles.li}>3-press "Sign in".</li>
                        </ul>
                    </section>,
                document.body
            )}
        </>
    )
}
