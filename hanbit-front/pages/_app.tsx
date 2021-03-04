import React from 'react';
import Head from 'next/head';
import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import CssBaseline from '@material-ui/core/CssBaseline';


function App({ Component, pageProps }: AppProps) {

	const router = useRouter()

	NProgress.configure({ easing: 'ease', speed: 500 });

	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		const handleStart = () => {
			NProgress.set(0.3);
			NProgress.start();
		}

		const handleComplete = () => {
			NProgress.done();
		}

		const handleError = () => {
			console.log('onRouteChnageError triggered');
			NProgress.done();
		}

		router.events.on('routeChangeStart', handleStart)

		router.events.on('routeChangeComplete', handleComplete);

		router.events.on('routeChangeError', handleError);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleError);
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
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default App
