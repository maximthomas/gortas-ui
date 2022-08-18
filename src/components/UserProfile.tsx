import { Button } from "@material-ui/core";
import React from "react";
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ISessionInfo } from "../commons/types";
import { ISessionService } from "../services/types";

export interface IUserProfileProps {
    sessionService: ISessionService
}

const sessionUrl = process.env.REACT_APP_GORTAS_URL! + process.env.REACT_APP_GORTAS_SESSION_PATH;

export const UserProfile: FC<IUserProfileProps> =  (props: IUserProfileProps) => {
    const [sessionData, setSessionData] = useState<ISessionInfo>();
    const navigate = useNavigate();
    useEffect(() => {
        refreshSession();
        
    }, []);
    const refreshSession = async () => {
        try {
            const newSessionData = await props.sessionService.getSessionInfo(sessionUrl);
            setSessionData(newSessionData);
        } catch(e) {
            navigate("/auth/login")
        }       
    }
    
    return <>
        <h1>{sessionData?.id}</h1>
        <h1>{sessionData?.sub}</h1>
        <Button onClick={refreshSession} >Refresh</Button>
    </>
}
