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
        menuItemStyle: {
            paddingLeft: '16px',
            paddingRight: '16px',
            height: '120px',
            width: '120px',
            backgroundColor: ' #fff',
            margin: '10px',
            justifyContent: 'center',
            borderRadius: '16px',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '24px',
            flexWrap: 'wrap',
        },
        listItem: {
            display: 'flex',
            gap: '16px'
        }
    })
);

const ChangesDrawer: React.FC<Props> = props => {
    const smallScreen = useMediaQuery('(max-width:600px)');
    const { drawerSPan, listItem } = useStyles({});
    return (
        <List className={drawerSPan} >
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#E77F81'
                    }}
                ></span>
                <Box>Negative change</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#FAF2BF'
                    }}
                ></span>
                <Box>Neutral change</Box>
            </ListItem>
            <ListItem className={listItem}>
                <span
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: '#99C93C'
                    }}
                ></span>
                <Box>Positive change</Box>
            </ListItem>
        </List>
    );
};

export default ChangesDrawer;
