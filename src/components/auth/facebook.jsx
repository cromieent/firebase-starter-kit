import React, { Component } from 'react';

export default class FacebookLogin extends Component {

    handleUnsubscribe = function (response) {
        console.log('unsubscribed from auth.statusChange event');
    };

    componentWillUnmount() {
        window.FB.Event.unsubscribe('auth.statusChange', this.handleUnsubscribe);
    }

    checkLoginState() {
        window.FB.getLoginStatus(response => {
            this.props.statusChangeCallback(response);
        });
    };

    login() {
        window.FB.login(this.checkLoginState(), {
            scope: 'public_profile,email'
        });
    };

    logout() {
        window.FB.logout();
        console.log('Logout complete');
    };

    testAPI() {
        window.FB.api('/me', function (response) {
            console.log('[FacebookLoginButton] successful login for: ', response);
        });
    }

    render() {
        return (
            <div>
                We use Facebook to ensure that you are a part of our group.  Please login to continue:<p />
                <button className="btn btn-block btn-fb"
                    onClick={() => this.login()} >
                    <i className="fa fa-facebook" />
                    Connect with Facebook
                </button>
                <button className="btn btn-block btn-fb"
                    onClick={() => this.logout()} >
                    <i className="fa fa-facebook" />
                    Logout from Facebook
                </button>
            </div>
        );
    };
};