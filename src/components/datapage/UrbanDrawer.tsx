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

const UrbanDrawer: React.FC<Props> = props => {
    const smallScreen = useMediaQuery('(max-width:600px)');
    const { drawerSPan, listItem } = useStyles({});
    return (
        <List className={drawerSPan} >
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#3866B0'
                    }}
                ></span>
                <Box>Water</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#949BA2'
                    }}
                ></span>
                <Box>Urban</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#138808'
                    }}
                ></span>
                <Box>Grass</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#004225'
                    }}
                ></span>
                <Box>Trees</Box>
            </ListItem>
        </List>
    );
};

export default UrbanDrawer;
