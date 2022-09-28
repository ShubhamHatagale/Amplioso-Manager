import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function ManagerSidebarRoute() {
    const history = useHistory()
    const classes = useStyles();
    const [open1, setOpen1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick1 = () => {
        setOpen1(!open1);
    };
    return (
        <List
        // component="nav"
        // aria-labelledby="nested-list-subheader"
        // // subheader=
        // // {
        // //     <ListSubheader component="div" id="nested-list-subheader">
        // //     </ListSubheader>
        // // }
        // className={classes.root}
        >
            <div onClick={() => { history.push("/") }}>
                <ListItem button >
                    <ListItemIcon>
                        {/* <DvrIcon /> */}
                        <i className="material-icons">dvr</i>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/password_setting") }}>
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">password</i>
                    </ListItemIcon>
                    <ListItemText primary="Password Setting" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/general_managers_setting") }}>
                <ListItem button>
                    <ListItemIcon>
                        <i className="material-icons">domain</i>
                        {/* <Domain /> */}
                    </ListItemIcon>
                    <ListItemText primary="General Manager Settings" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/assign_survey") }}>
                <ListItem button>
                    <ListItemIcon>
                        {/* <People /> */}
                        <i className="material-icons">people</i>
                    </ListItemIcon>
                    <ListItemText primary="Assign Surveys" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/") }}>
                <ListItem button>
                    <ListItemIcon>
                        {/* <PersonIcon /> */}
                        <i className="material-icons">manage_search </i>
                    </ListItemIcon>
                    <ListItemText primary="View and Export Results" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/view_all_surveys") }}>
                <ListItem button>
                    <ListItemIcon>
                        {/* <PersonIcon /> */}
                        <i className="material-icons">transform</i>
                    </ListItemIcon>
                    <ListItemText primary="View All Surveys" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/") }}>
                <ListItem button>
                    <ListItemIcon>
                        {/* <PersonIcon /> */} 
                        <i className="material-icons">add_to_queue</i>
                    </ListItemIcon>
                    <ListItemText primary="Contact Amplioso" />
                </ListItem>
            </div>
            <div onClick={() => { history.push("/manager_leads") }}>
                <ListItem button>
                    <ListItemIcon>
                        {/* <PersonIcon /> */} 
                        <i className="material-icons">people</i>
                    </ListItemIcon>
                    <ListItemText primary="Manage Leads" />
                </ListItem>
            </div>
        </List >
    );
}