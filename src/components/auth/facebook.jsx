import React, { Component } from 'react';
import FBAPI from './fbapi';

export default class FacebookLogin extends Component {

    constructor(props) {
        super(props);
        const FB = new FBAPI();
        (async () => {
            await FB.init({
                appId: '2290549227843086',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0',
            });

            //           let authResponse = await FB.getLoginStatus();
            //           this.props.setFacebookData(authResponse);


            /*                     if (authResponse.status === 'unknown') {
                                  authResponse = await FB.login();
                                  console.log('The Login operation returned ' + authResponse);
                              }
                              const me = await FB.me();
                              
                           */
        })();
        this.state = {
            FB,
            isLoggedIn: (props.values) ? props.values.isLoggedIn : false
        };
    }

    login = async () => {
        const { FB } = this.state;
        let authResponse = await FB.getLoginStatus();
        if (authResponse.status === 'unknown') {
            authResponse = await FB.login();
        }
        const me = await FB.me();
        const { accessToken, signedRequest, userID } = authResponse.authResponse;
        const fbData = {
            accessToken: accessToken,
            signedRequest: signedRequest,
            facebookId: userID,
            lastName: me.last_name,
            firstName: me.first_name,
            email: me.email,
            isLoggedIn: true
        }
        this.props.setFacebookData(fbData);
    };

    logout = () => {
        window.FB.logout();
        this.setState({ isLoggedIn: false });
    };

    render() {
        const { isLoggedIn } = this.state;
        if (!isLoggedIn) {
            return (
                <div>
                    We use Facebook to ensure that you are a part of our group.  Please login to continue:<p />
                    <button className="btn btn-block btn-fb"
                        onClick={() => this.login()} >
                        <i className="fa fa-facebook" />
                        Connect with Facebook
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn btn-block btn-fb"
                        onClick={() => this.logout()} >
                        <i className="fa fa-facebook" />
                        Logout from Facebook
                    </button>
                </div>
            );
        }
    };

};
