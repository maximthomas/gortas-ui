/* eslint-disable no-undef */
import React, {useEffect} from "react";

export const AutoSubmit = (props) => {

    function setAutoSubmit() {
        const autosubmit = setInterval(() => {
            props.submitFunction();
        }, parseInt(props.interval) * 1000);
        return () => {
            clearInterval(autosubmit);
        };
    }

    useEffect(setAutoSubmit, []);

    return (
        <></>
    );
};