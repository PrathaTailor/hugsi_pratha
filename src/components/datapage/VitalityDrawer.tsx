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
            position: 'fixed',
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

const VitalityDrawer: React.FC<Props> = props => {
    const smallScreen = useMediaQuery('(max-width:600px)');
    const { drawerSPan, listItem } = useStyles({});
    return (
        <List className={drawerSPan} >
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#DF474A'
                    }}
                ></span>
                <Box>-1 - 0 (Dead plants or inanimate object)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#DAAF3D'
                    }}
                ></span>
                <Box>0 - 0.33 (Unhealthy Plant)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#99c93c'
                    }}
                ></span>
                <Box>0.33 - 0.66 (Moderately Heathly plant)</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#698d29'
                    }}
                ></span>
                <Box>0.66 - 1 (Very Healthy Plant)</Box>
            </ListItem>
        </List>
    );
};

export default VitalityDrawer;
