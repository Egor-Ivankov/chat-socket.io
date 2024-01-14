import {useEffect, useState} from "react";
import {io, Socket} from 'socket.io-client';
import {useLocation} from "react-router-dom";
import {Params} from "../../types/form-types.ts";

const socket: Socket = io('http://localhost:5311');
function Chat() {

    const { search } = useLocation();
    const [params, setParams] = useState<Params | null >(null);


    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({data}) => {
            console.log(data);
        })
    }, []);

    return (
        <>
            Chat XUI
        </>
    );
}

export default Chat;