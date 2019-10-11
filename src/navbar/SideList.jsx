import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import * as routes from '../routes';

const SideList = props => {
    const linksToRender = props.isSignedIn ? routes.signedInLinks : routes.signedOutLinks;
    return (
        <div
            role="presentation"
            onClick={props.closeNavbar}
            onKeyDown={props.closeNavbar}
        >
            <List>
                {linksToRender.map(item => (
                    <ListItem button key={item.title} onClick={() => props.redirect(item.addUserId ? `${item.path}/${props.userId}` : item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            {props.isAdmin && (
            <>
                <Divider />
                <List>
                    {routes.adminLinks.map(item => (
                        <ListItem
                            button
                            key={item.title}
                            onClick={() => props.redirect(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </>
            )}
        </div>
    );
};

SideList.defaultProps = {
    closeNavbar: noop,
    isAdmin: false,
    isSignedIn: false,
    redirect: noop,
    userId: ''
};

SideList.propTypes = {
    closeNavbar: PropTypes.func,
    isAdmin: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    redirect: PropTypes.func,
    userId: PropTypes.string
};


export default SideList;
