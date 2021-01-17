import React, { Component } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Style from '../static/Style';

class Layout extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8' />
                    <meta name="description" content="こちらはお問合せフォームです。" />
                    <meta name='viewport' content='initial-scale=!.0, width=device-width' />
                </Head>
                {Style}
                <Header title={this.props.title} />
                {this.props.children}
                <Footer footer="copyright Ooooooomin365" />
            </div>
        );
    }
}
export default Layout;