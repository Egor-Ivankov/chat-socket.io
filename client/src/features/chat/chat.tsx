import {useEffect, useState, SyntheticEvent} from "react";
import {io, Socket} from 'socket.io-client';
import {useLocation, useNavigate} from "react-router-dom";
import {Params, MessagesType} from "../../types/form-types.ts";
import EmojiPicker from "emoji-picker-react";
import {EmojiClick} from "../../types/form-types.ts";
import UsersMessages from "../user-messages/users-messages.tsx";
import Send from '../../assets/send.png';
import Emoji from '../../assets/emoji.png';
import styles from '../../styles/Chat.module.css';

const socket: Socket = io('http://localhost:5311');
function Chat() {

    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState<Params>({room: '', name: ''});
    const [messages, setMessages] = useState<MessagesType[] | []>([]);
    const [message, setUserMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setMessages((_messages) => [..._messages, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('changeRoom', ({ data: { users } }) => {
            setUsers(users.length);
        });
    }, []);

    const leftRoom = () => {
        socket.emit('leftRoom', { params });
        navigate('/');
    }

    const handleChange = (value: string) => {
        setUserMessage(value);
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if(!message) return;

        socket.emit('sendMessage', {message, params});

        setUserMessage('');
    }
    const onEmojiClick: EmojiClick = ({ emoji }) => {
        setUserMessage((messages) => `${messages} ${emoji}` );
    };

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <p className={styles.paragraph}>{`Room: ${params?.room}`}</p>
                <p className={styles.paragraph}>{users} users in this room</p>
                <button
                    onClick={leftRoom}
                    className={styles.leftRoom}>
                    Left the room
                </button>
            </div>
            <div className={styles.main}>
                <UsersMessages messages={messages} name={params.name}/>
            </div>
            <form className={styles.client} onSubmit={handleSubmit}>
                <input
                    className={styles.userMessage}
                    type='text'
                    placeholder='Enter your message'
                    required
                    autoComplete='off'
                    value={message}
                    onChange={(e) => handleChange(e.target.value)}
                />

                <img
                    src={Emoji}
                    alt="emoji"
                    className={styles.emoji}
                    onClick={() => setIsOpen(!isOpen)}
                />

                <button className={styles.sendMessage} type="submit">
                    Send
                    <img src={Send} alt='send-icon' className={styles.sendIcon}/>
                </button>

                {
                    isOpen && (
                        <div className={styles.emojiPicker}>
                            <EmojiPicker onEmojiClick={onEmojiClick}/>
                        </div>
                    )
                }
            </form>
        </section>
    );
}

export default Chat;