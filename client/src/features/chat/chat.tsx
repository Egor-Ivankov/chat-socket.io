import {useEffect, useState} from "react";
import {io, Socket} from 'socket.io-client';
import {useLocation} from "react-router-dom";
import {Params, Messages} from "../../types/form-types.ts";
import EmojiPicker from "emoji-picker-react";
import Send from '../../assets/send.png';
import Emoji from '../../assets/emoji.png';
import '../../styles/chat.scss';

const socket: Socket = io('http://localhost:5311');
function Chat() {

    const { search } = useLocation();
    const [params, setParams] = useState<Params>({room: '', name: ''});
    const [messages, setMessages] = useState<Messages[] | []>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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

    const leftRoom = () => {

    }

    const handleChange = (value: string) => {
        setUserMessage(value);
    }

    const handleSubmit = () => {

    }
    const onEmojiClick = ({ emoji }) => {
        setUserMessage((messages) => `${messages} ${emoji}` );
    };

    return (
        <section className='chat-container'>
            <div className='chat-container-header'>
                <p className='chat-container-header-paragraph'>{`Room: ${params?.room}`}</p>
                <p className='chat-container-header-paragraph'>0 users in this room</p>
                <button
                    onClick={leftRoom}
                    className='chat-container-header-button'>
                    Left the room
                </button>
            </div>
            <div className='chat-container-main'>
                {messages.map(({message}, i) => <span key={i}>{message}</span>)}
            </div>
            <form className='chat-container-client' onSubmit={handleSubmit}>
                <input
                    className="chat-container-client-input"
                    type='text'
                    placeholder='Enter your message'
                    required
                    autoComplete='off'
                    value={userMessage}
                    onChange={(e) => handleChange(e.target.value)}
                />

                <img
                    src={Emoji}
                    alt="emoji"
                    className='chat-container-client-emoji'
                    onClick={() => setIsOpen(!isOpen)}
                />

                <button className="chat-container-client-button" type="submit">
                    Send
                    <img src={Send} alt='send-icon' className="chat-container-client-button-icon"/>
                </button>

                {
                    isOpen && (
                        <div className='emoji-picker'>
                            <EmojiPicker onEmojiClick={onEmojiClick}/>
                        </div>
                    )
                }
            </form>
        </section>
    );
}

export default Chat;