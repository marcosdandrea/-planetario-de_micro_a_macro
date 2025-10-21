import { requests } from "@common/ipcRequests";
import { SocketContext } from "@contexts/socket";
import { message } from "antd";
import { useContext, useState } from "react";

const useAuthorization = () => {
    const { socket } = useContext(SocketContext);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const authorize = (password: string) => {
        socket.emit(requests.authorize, { password }, (response: { authorized: boolean }) => {
            setIsAuthorized(response.authorized);
            if (response.authorized) {
                message.success("Acceso autorizado");
            } else {
                message.error("Acceso denegado");
            }
        })
    }

    return { isAuthorized, authorize };
}

export default useAuthorization;
