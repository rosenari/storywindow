import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Fonts, generateFontStyleJsx } from '../font';

const FontStyleJsx = generateFontStyleJsx(Fonts);

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => 
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });
                const initialProps = await Document.getInitialProps(ctx);
                return {
                    ...initialProps,
                    styles: (
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
                    <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
                    {
                        Fonts.map(({ type, url }) => <link key={url} rel="preload" crossOrigin="anonymous" as="font" type={type} href={url} />)
                    }
                    <style dangerouslySetInnerHTML={{__html: FontStyleJsx}}>
                    </style>
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