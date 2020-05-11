import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import { grommet, Grommet, Anchor, Box, Button, Header, Nav, Image, Avatar, Text } from 'grommet';

import { Login, Notes, Logout, Organization, User, StatusCritical, Refresh, CheckboxSelected, Gamepad } from "grommet-icons";
import "./Home.css";

import {Dashboard} from 'Components';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resent: false,
            tag:''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
    }

    playAsGuest = () => {
        var items=["nar","An","Alfr","Alvi","Ari","Arinbjorn","Arngeir","Arngrim","Arnfinn","Asgeirr","Askell","Asvald","Bard","Baror","Bersi","Borkr","Bjarni","Bjorn","Brand","Brandr","Cairn","Canute","Dar","Einarr","Eirik","Egill","Engli","Eyvindr","Erik","Eyvind","Finnr","Floki","Fromund","Geirmundr","Geirr","Geri","Gisli","Gizzur","Gjafvaldr","Glumr","Gorm","Grmir","Gunnarr","Guomundr","Hak","Halbjorn","Halfdan","Hallvard","Hamal","Hamundr","Harald","Harek","Hedinn","Helgi","Henrik","Herbjorn","Herjolfr","Hildir","Hogni","Hrani","Ivarr","Hrolf","Jimmy","Jon","Jorund","Kalf","Ketil","Kheldar","Klaengr","Knut","Kolbeinn","Kolli","Kollr","Lambi","Magnus","Moldof","Mursi","Njall","Oddr","Olaf","Orlyg","Ormr","Ornolf","Osvald","Ozurr","Poror","Prondir","Ragi","Ragnvald","Refr","Runolf","Saemund","Siegfried","Sigmundr","Sigurd","Sigvat","Skeggi","Skomlr","Slode","Snorri","Sokkolf","Solvi","Surt","Sven","Thangbrand","Thjodoft","Thorod","Thorgest","Thorvald","Thrain","Throst","Torfi","Torix","Tryfing","Ulf","Valgaror","Vali","Vifil","Vigfus","Vika","Waltheof"];

        fetch('/api/playAsGuest', {
            method: 'POST',
            body: JSON.stringify({playerTag: items[Math.floor(Math.random()*items.length)]}),
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if ('error' in data) {
                this.setState({error: data.msg});
            }
            else {
                data.guest = true;
                data.verified = true;
                this.props.data.login(data);
                this.props.history.push('/');
            }
        }) 
        .catch(err => {
            console.error(err);
        });
    }

    
    componentDidMount() {
        this.setState(this.props.data);
    }

    resendEmail() {
        
        fetch('/api/sendVerification', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({resent: true});
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {

        const customTheme = {
            global: {
              colors: {
                custom: "#cc6633"
              }
            }
        };

        const anchorColour = "#f2664a";
        const anchorColourAlt = "#fde0bc";
        const grey = "#474442";
        const yellow = "#fbb867";
        const brightYellow = "#fdde4e";
        const orange = "#f2664a";

        return (
            <Grommet theme={customTheme}>

                <Box
                    direction="column"
                    pad="none"
                    width="100vw"
                    height="100vh"
                    round="small"
                    direction="column"
                    gap="small"
                >

                    <Box width="100%" direction="row" align="center" justify="between" background={grey} pad="small">
                        
                        <Box direction="row" align="center" gap="small">
                            {this.state.isLoggedIn && 
                                <Avatar background={anchorColourAlt}>
                                    <User color="dark-1" />
                                </Avatar>
                            }
                            {!this.state.isLoggedIn && 
                                <Anchor color={anchorColourAlt}>
                                    {this.props.data.playerTag}
                                </Anchor>
                            }
                            {this.state.isLoggedIn && 
                                <Link to="/profile" style={{ textDecoration: 'none' }}>
                                    <Anchor color={anchorColourAlt}>
                                        {this.props.data.playerTag}
                                    </Anchor>
                                </Link>
                            }
                        </Box>
                        <Nav direction="row">
                            {!this.props.data.verified && this.state.isLoggedIn &&
                                <Box width={{"min":"200px"}} height="45px" direction="row" background={orange} round="medium" align="center" gap="small" pad="small">
                                    <StatusCritical color={anchorColourAlt} />
                                    <Text color={anchorColourAlt}>Email not verified!</Text>
                                    {!this.state.resent ?
                                        <Button 
                                            size="small" 
                                            color={brightYellow} 
                                            icon={<Refresh />} 
                                            primary label="Resend" 
                                            onClick={() => this.resendEmail()}
                                            gap="xxsmall"
                                            margin="none"
                                        />
                                    :
                                        <Button 
                                            size="small" 
                                            color={grey} 
                                            icon={<CheckboxSelected color={brightYellow} />} 
                                            primary label="Sent!" 
                                            disabled="true"
                                            gap="xxsmall"
                                        />
                                        
                                    }
                                </Box>
                            }
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Box direction="row" align="center">
                                    <Organization color={anchorColourAlt} size='20px' />
                                    <Anchor label="Home" key="Home" color={anchorColour} margin="xsmall"/>
                                </Box>
                            </Link>
                            {!this.state.isLoggedIn && 
                                <Box direction="row" align="center" onClick={() => this.playAsGuest()}>
                                    <Gamepad color={anchorColourAlt} size='20px' />
                                    <Anchor label="Play as Guest" key="pg" color={anchorColour}  margin="xsmall"/>
                                </Box>
                            }

                            {!this.state.isLoggedIn && 
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center">
                                        <Notes color={anchorColourAlt} size='20px' />
                                        <Anchor label="Register" key="Register" color={anchorColour}  margin="xsmall"/>
                                    </Box>
                                </Link>
                            }
                            
                            {!this.state.isLoggedIn && 
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center">
                                        <Login color={anchorColourAlt} size='20px' />
                                        <Anchor label="Login" key="Login" color={anchorColour}  margin="xsmall"/>
                                    </Box>
                                </Link>
                            }

                            {this.state.isLoggedIn && 
                                <Link to="/logout" style={{ textDecoration: 'none' }}>
                                    <Box direction="row" align="center">
                                        <Logout color={anchorColourAlt} size='20px' />
                                        <Anchor label="Logout" key="Logout" color={anchorColour}  margin="xsmall"/>
                                    </Box>
                                </Link>
                            }
                        </Nav>
                    </Box>

                    <Box fill background='none'>
                        <Dashboard data={this.props.data}/>
                    </Box>
                </Box>
            
                
            </Grommet>
        );
    }
    
}

export default withRouter(Home);