import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	title: {
		margin: theme.spacing(2),
		fontSize: '1.2em',
		fontWeight: 'bold'
	},
	main: {
		margin: theme.spacing(2),
	}
}));

export default function Test() {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.title}>
				컴포넌트 테스트 페이지
			</div>
			<div className={classes.main}>
				<Button variant="contained" color="secondary">버튼</Button>
			</div>
		</div>
	);
}

