import React, { Component } from 'react';
import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';

export default () => {
    return (
        <Layout title="お問合せフォーム">
            <ContactForm />
        </Layout>
    );
}