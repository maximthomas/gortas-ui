import React, {useEffect, useState} from 'react';
import {Button, Modal} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const idmUrl = process.env.REACT_APP_GORTAS_URL + '/gortas/v1/idm';

export function Profile(props) {

    const [session, setSession] = useState({});
    const [qrAuth, setQRAuth] = useState({open:false});

    const history = useHistory();

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const response = await fetch(idmUrl, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 401){
            history.push('/login/users/login');
            return;
        }
        const data = await response.json();
        setSession(data);
    }

    const openQRAuth = () => {
        setQRAuth({open: true});
    }
    const closeQRAuth = () => {
        setQRAuth({open: false});
    }

    return <Properties session={session} qrAuth={qrAuth} openQRAuth={openQRAuth} closeQRAuth={closeQRAuth}/>;

}

function Properties({session, qrAuth, openQRAuth, closeQRAuth}) {
    if (!!session["properties"]) {
        let props =session["properties"];
        let propsElements = []
        if (!!props) {
            Object.keys(props).forEach((k) => {
                propsElements.push(<p key={k}>{k}: {props[k]}</p>)
            });
        }
        return <div>
            <p>Login: {props["sub"]}</p>
            {propsElements}
            <div style={{textAlign: 'center'}}>
                <Button onClick={openQRAuth}  variant="contained" type="button" color="default">Set QR Auth</Button>
                <QRAuth open={qrAuth.open} handleClose={closeQRAuth} />
            </div>
        </div>
    } else {
        return <div/>
    }
}

function QRAuth(props) {
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    const [data, setData] = useState({"qr" : ""});

    const fetchData = async () => {
        const result = await fetch(idmUrl + "/otp/qr", {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const jsonData = await result.json();
        setData(jsonData);
    }

    const onRendered = () => {
       fetchData();
    }

    return <Modal
        open={props.open}
        onRendered={onRendered}
        onBackdropClick={props.handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
            <h1>Scan QR Code</h1>
            <img src={data.qr} alt={'qr code'} style={{display: 'block', margin: '0 auto'}}/>
        </div>

    </Modal>
}