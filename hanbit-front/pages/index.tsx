import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		}
	},
}));

export default function Home() {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.root}>
				<Button variant="contained" color="secondary">버튼</Button>
			</div>
		</div>
	);
}

