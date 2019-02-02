import React, { Component } from 'react';

class FBAPI extends Component {

    constructor(props) {
        super(props);

        console.log('FBAPI Constructor called');
    }

    componentWillMount() {
        const { values } = this.props;

        console.log(`FBAPI componentWillMount called with ${values}`);
    }

    getScript() {
        return new Promise((resolve) => {
            if (window.FB) {
                resolve(window.FB);
            }
            const id = 'facebook-jssdk';
            const fjs = document.querySelectorAll('script')[0];
            if (document.getElementById(id)) {
                return;
            }
            const js = document.createElement('script');
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            js.addEventListener('load', () => {
                Object.assign(this, {
                    AppEvents: window.FB.AppEvents,
                    Canvas: window.FB.Canvas,
                    Event: window.FB.Event,
                    Frictionless: window.FB.Frictionless,
                    XFBML: window.FB.XFBML,
                });
                resolve(window.FB);
            });
            fjs.parentNode.insertBefore(js, fjs);
        });
    }

    api(...params) {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            const callback = (response) => {
                resolve(response);
            };
            if (params.length > 3) {
                params.slice(0, 3);
            }
            params.push(callback);
            FB.api(...params);
        });
    }

    ui(params) {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            FB.ui(params, (response) => {
                resolve(response);
            });
        });
    }

    init(params = {}) {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            FB.init(params);
            FB.Event.subscribe('auth.statusChange', (e) => {
                switch (e.status) {
                    case 'connected':
                        console.log('event triggered - Connected');
                        console.log(e);
                        break;
                    case 'unknown':
                        console.log('event triggered - not connected');
                        console.log(e);
                        break;
                    default:
                        console.log('event triggered - default case');
                        console.log(e);
                }
            });
            resolve(FB);
        })
    };

    getLoginStatus() {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            FB.getLoginStatus((response) => {
                resolve(response);
            }, true);
        });
    };

    login(params = { scope: 'public_profile,email' }) {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            FB.login((response) => {
                resolve(response);
            }, params);
        });
    };

    logout() {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            FB.logout((response) => {
                resolve(response);
            });
        });
    };

    getAuthResponse() {
        return new Promise(async (resolve) => {
            const FB = await this.getScript();
            resolve(FB.getAuthResponse());
        });
    };

    me() {
        return new Promise(async (resolve) => {
            const me = await this.api('/me?fields=name,email,gender,verified,link,first_name,last_name');
            resolve(me);
        });
    };


    render() {
        const { values } = this.props;
        if (values) {
            return <div>{values}</div>;
        }
        return <div>Nothing Here Yet</div>
    }
}
export default FBAPI;

/*
    auth_response_change_callback = (response) => {
    console.log("auth_response_change_callback");
    console.log(response);
    };
    auth_status_change_callback = (response) => {
    console.log("auth_status_change_callback: " + response.status);
    this.props.updateLoginState(response.status);
    };



    */

