import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Box from '@material-ui/core/Box';
import { Order, UseStyles } from './rankings-table';
import { City } from '../../models';
import InfoTooltip from '../info-tooltip/info-tooltip';
import LandUsageIcons from './land-usage-icons';

interface EnhancedTableHeadProps {
  classes: UseStyles;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof City
  ) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  order: Order;
  orderBy: keyof City;
  rowCount: number;
  headRows: any;
}

/**
 * Enhanced Table Head component
 * @param headRows - header of each column
 * @param classes - CSS properties
 * @param order - which order
 * @param orderBy - sort
 * @param onRequestSort - a function on request sort
 */
const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  headRows,
  classes,
  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property: keyof City) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headRows.map(row =>
          row.id !== null ? (
            <TableCell
              style={{
                fontSize: '1.2rem',
              }}
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  fontWeight: orderBy === row.id ? 'bold' : 'normal',
                }}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                  {orderBy === row.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
                {row.tooltip && (
                  <InfoTooltip
                    title={row.tooltip.title}
                    details={row.tooltip.content}
                  />
                )}
              </Box>

              {/* {row.label.includes('Distribution') && <LandUsageIcons iconsSize={'1rem'} />} */}
            </TableCell>
          ) : (
            <TableCell
              style={{ fontSize: '1.2em' }}
              key={row.id}
              padding={'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              {row.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
