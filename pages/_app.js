import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from 'next/app';
import Head from 'next/head';

// Initial dummy data
import DummyData from '../data/dummy.json';
// Base CSS Style
import '../style/app.css';
import Lib from '../lib/utils';

export default class MyApp extends App {

    componentDidMount() {
        
        let initMemo = [];
        
        // Get saved data from localstorage
        const savedMemo = Lib.getFromLocalStorage('my-memo');
        if(savedMemo) {
            const memo = JSON.parse(savedMemo);
            if(memo.length > 0) {
                initMemo = memo.splice(0);
            }
        }

        // Or use dummy data
        if(initMemo.length === 0) {
            initMemo = DummyData.items.splice(0);
        }
        
        store.dispatch({
            type: 'INIT_MEMO',
            payload: initMemo
        })
    }
    
    render() {
        const { Component, pageProps } = this.props;
        const siteTitle = process.env.siteTitle;
        return (
            <>
            <Provider store={store}>
                <Head>
                    <title>{ siteTitle }</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Component { ...pageProps } />
            </Provider>        
            </>
        )
    }
}