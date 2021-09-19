import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dashboard, NoteAdd, PostAdd } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },

        link: {
            color: 'inherit',
            textDecoration: 'none',

            '&.active > div': {
                backgroundColor: theme.palette.action.selected,
                
            }
        }
    }),
);

export function Sidebar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to="/home/dashboard" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                        <Dashboard/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>

                <NavLink to="/home/post" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                        <PostAdd/>
                        </ListItemIcon>
                        <ListItemText primary="Post" />
                    </ListItem>
                </NavLink>

                <NavLink to="/home/note" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                        <NoteAdd/>
                        </ListItemIcon>
                        <ListItemText primary="Note" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}
