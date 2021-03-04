import React from 'react';
import Head from 'next/head';
import { AppProps } from "next/app";
import CssBaseline from '@material-ui/core/CssBaseline';

function App({ Component, pageProps }: AppProps) {

	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
				<meta name="description" content="대전블라인드 한빛창" />
				<meta name="keywords" content="대전전동블라인드,대전블라인드,대전커튼,전동블라인드,우드블라인드,콤비블라인드,블라인드,커튼,롤스크린,허니콤쉐이드" />
				<title>대전블라인드 한빛창</title>
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default App
