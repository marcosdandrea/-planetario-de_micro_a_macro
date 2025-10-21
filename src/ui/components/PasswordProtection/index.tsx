import React from "react";
import style from "./style.module.css";
import { Input, Modal } from "antd";
import { useState } from "react";
import useAuthorization from "@hooks/useAuthorization";


const PasswordProtection = ({ children}) => {
    const {authorize, isAuthorized} = useAuthorization();
    const [value, setValue] = useState("");
    
    const handleConfirm = () => {
        authorize(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            authorize(value);
        }
    }

    if (!isAuthorized) {
        return (
            <>
                <div className={style.passwordProtection}>
                    {children}
                </div>
                <Modal
                    title="Acceso Protegido"
                    open={true}
                    onOk={handleConfirm}
                    onCancel={() => {}}
                    okText="Ingresar"
                    cancelText="Cancelar"
                    centered
                    closable={false}
                    maskClosable={false}
                >
                    <p>Ingrese la contraseña para continuar:</p>
                    <Input.Password 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Contraseña"
                        autoFocus
                    />
                </Modal>
            </>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default PasswordProtection;