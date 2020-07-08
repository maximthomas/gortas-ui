import React, {useEffect, useState} from "react";
import {Callbacks} from "./Callbacks";
import { useHistory, useParams } from "react-router-dom";

const signInUrl = process.env.REACT_APP_GORTAS_URL + process.env.REACT_APP_GORTAS_SIGN_IN_PATH;

export function Authentication(props) {

    const history = useHistory();
    const {realm, chain} = useParams();

    const [callbacks, setCallbacks] = useState([]);

    const getCallbacks = async () => {

        try {
            const response = await fetch(getAuthUrl(), {
                credentials: "include",
            });
            processAuthData(await response.json());
        } catch(e) {
            console.log(e);
            props.authFailed();
        }
        return [];
    }

    useEffect(() => { getCallbacks() }, []);

    const processAuthData = (data) => {
        if (data['callbacks']) {
            setCallbacks(data['callbacks']);
        }
        if (data["status"]) {
            if (data["status"] === "success") {
                props.authSucceeded();
                if (!!data["redirect_uri"]) {
                    window.location.href = data["redirect_uri"];
                } else {
                    history.push("/");
                }
            } else if (data["status"] === "failed") {
                props.authFailed()
            }
        }
    }

    const getAuthUrl = () => {
        const authUrl = process.env.REACT_APP_GORTAS_URL + `/gortas/v1/login/${realm}/${chain}` + window.location.search;
        return authUrl;
    }

    const submitCallbacks = (e) => {
        if (!!e) {
            e.preventDefault();
        }
        const cbs = callbacks.slice();
        const request = {
            callbacks: cbs,
        }
        const requestBody = JSON.stringify(request)
        fetch(getAuthUrl(), {
            method: 'POST',
            body: requestBody,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                processAuthData(data);
            });

        return false;
    }

    const updateCallback = (callbackValue, name) => {
        const cbs = callbacks.slice();
        cbs.forEach(callback => {
            if (callback.name === name) {
                callback.value = callbackValue;
            }
        });
        setCallbacks(cbs);
    }

    return <Callbacks callbacks={callbacks}
                           submitCallbacks={submitCallbacks}
                           updateCallback={updateCallback}/>;
}