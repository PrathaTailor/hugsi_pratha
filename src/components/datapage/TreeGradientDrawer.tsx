import { Box, List, ListItem } from '@material-ui/core';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

interface Props {
    activemenu: any;
}
const useStyles = makeStyles(() =>
    createStyles({
        drawerSPan: {
            position: 'absolute',
            bottom: '40px',
            left: '0px',
            backgroundColor: ' #fff',
            padding: '15px',
            marginLeft: '40px',
            fontSize: '0.9rem',
            borderRadius: '10px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.05), 0px 2px 16px rgba(0, 0, 0, 0.12)'
        },
        listItem: {
            display: 'flex',
            gap: '16px'
        }
    })
);

const TreeGradientDrawer: React.FC<Props> = props => {
    const smallScreen = useMediaQuery('(max-width:600px)');
    const { drawerSPan, listItem } = useStyles({});
    return (
        <List className={drawerSPan} >
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#99C93D'
                    }}
                ></span>
                <Box>0-10% (Very Low)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#299617'
                    }}
                ></span>
                <Box>10-30% (Low)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#138808'
                    }}
                ></span>
                <Box>30-65% (Medium)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#005c29'
                    }}
                ></span>
                <Box>65-80% (High)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#004225'
                    }}
                ></span>
                <Box>80-95% (Very High)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#013220'
                    }}
                ></span>
                <Box>95% above (Extreme High)</Box>
            </ListItem>
        </List>
    );
};

export default TreeGradientDrawer;
