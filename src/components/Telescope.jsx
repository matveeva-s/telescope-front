import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../styles/telescopes.css';
import { makeStyles } from '@material-ui/core/styles';
import { mainTheme } from "../styles/themes";


const useStyles = makeStyles({
    root: {
        maxWidth: '70%',
        margin: '20px auto',
    },
    media: {
        height: 200,
    },
});

export const Telescope = (props) => {
    const { telescope } = props;
    const classes = useStyles();
    return (
        <ThemeProvider theme={ mainTheme }>
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    image={ telescope.avatar }
                    title="Contemplative Reptile"
                    className={classes.media}
                />
                <CardContent>
                    <div className="telescope-name-container">
                        <Typography gutterBottom variant="h4" component="h2">
                            { telescope.name }
                        </Typography>
                        { telescope.status === 'Online' && <div className="telescope-online-green-circle"/> }
                    </div>
                    <Typography gutterBottom variant="h6" component="h6">
                        {telescope.latitude}, {telescope.longitude} ({ telescope.location })
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { telescope.description }
                    </Typography>
                    <br/>
                    <Typography gutterBottom variant="h6" component="h6">
                        Оставшееся наблюдательное время - { telescope.balance } минут
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Добавить задание
                </Button>
                <Button size="small" color="primary">
                    Запросить часы
                </Button>
            </CardActions>
        </Card>
        </ThemeProvider>
    )
};
