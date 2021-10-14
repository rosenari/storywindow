import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
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