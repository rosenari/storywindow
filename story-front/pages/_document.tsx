import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => 
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                });
                const initialProps = await Document.getInitialProps(ctx);
                return {
                    ...initialProps,
                    style: (
                        <>
                            {initialProps.styles}
                            {sheet.getStyleElement()}
                        </>
                    )
                }
        } finally{
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="canonical" href="https://storywindow.co.kr/" />
                    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&family=Noto+Sans+KR&family=Nanum+Brush+Script&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;