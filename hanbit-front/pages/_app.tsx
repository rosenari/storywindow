import React from 'react';
import Head from 'next/head';
//import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { Header, Footer } from "../components";
import './css/global.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import wrapper from '../store'
import { NextComponentType } from 'next';
import { AppContext, AppInitialProps } from 'next/app';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import "./global.color.css";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component, pageProps }) => {

	console.log("APp");

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
				<meta name="description" content="전동블라인드,블라인드도매,전동커튼,충전식전동블라인드,블라인드공장" />
				<meta name="keywords" content="전동블라인드,블라인드도매,전동커튼,충전식전동블라인드,블라인드공장" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="블라인드 선두기업 - 스토리창" />
				<meta property="og:description" content="전동블라인드,블라인드도매,전동커튼,충전식전동블라인드,블라인드공장" />
				<meta property="og:image" content="https://storywindow.co.kr/images/storylogo_big.png" />
				<meta property="og:url" content="https://storywindow.co.kr" />
				<title>블라인드 선두기업 - 스토리창</title>
			</Head>
			<Header />
			<div style={{
				position: "relative",
				margin: "0px auto",
				padding: "0px",
				marginTop: "101px"
			}}>
				<Component {...pageProps} />
			</div>
			<Footer />
		</React.Fragment>
	);
}

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
	let pageProps = {};
	if (Component.getInitialProps) {
		console.log("App getInital props");
		pageProps = await Component.getInitialProps(ctx);
	}
	return { pageProps };
};

export default wrapper.withRedux(App);
