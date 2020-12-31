import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class MainLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
                <Helmet>
                    <meta name ="description" content="Trystan Brock web development portfolio"/>
                    <title>{`Trystan Brock – Web Developer`}</title>
                </Helmet>
                <div className="">
                    <div>{children}</div>
                </div>
            </>
        );
    }
}