import React, {useState} from 'react';
import {Button, Modal} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const idmUrl = process.env.REACT_APP_GORTAS_URL + '/gortas/v1/idm';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: {},
            qrAuth: {
                open: false,
            }
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        fetch(idmUrl, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({session: data})
        });
    }

    openQRAuth = () => {
        this.setState({qrAuth: {open: true}})
    }
    closeQRAuth = () => {
        this.setState({qrAuth: {open: false}})
    }

    render() {
        if (!!this.state.session["properties"]) {
            let props = this.state.session["properties"];
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
                    <Button onClick={this.openQRAuth}  variant="contained" type="button" color="default">Proceed</Button>
                    <QRAuth open={this.state.qrAuth.open} handleClose={this.closeQRAuth} />
                </div>
            </div>
        } else {
            return <div/>
        }
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
       fetchData()
    }

    return <Modal
        open={props.open}
        onRendered={onRendered}
        onBackdropClick={props.handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
            <h1>123123123</h1>
            <img src={data.qr} alt={'qr code'} style={{display: 'block', margin: '0 auto'}}/>
        </div>

    </Modal>
}