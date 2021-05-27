import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ROUTE_PATHS } from 'router/Config';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import useQuery from 'hooks/useQuery';
import { HashtagQueryParams } from '../../types/hashtags';
import useGetHashtags from '../../hooks/hashtags/useGetHashtags';

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      maxWidth: '100%',
      maxHeight: 510,
    },
    tableRow: {
      '&:hover': {
        backgroundColor: purple[50],
        cursor: 'pointer',
      },
    },
    tableCell: {
      paddingLeft: '15px',
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  })
);

const getHashtagQueryParams = (searchValue: string): HashtagQueryParams => ({
  like: searchValue || undefined,
});

// TODO : Add tests
// TODO : Add stories
const SearchListHashtags: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const searchValue = useQuery().get('value');

  const { hashtags } = useGetHashtags(getHashtagQueryParams(searchValue));

  const handleClick = (newRoute: string) => {
    history.push(newRoute);
  };

  const smallMobile = useMediaQuery('(max-width:400px)');
  return (
    <TableContainer className={classes.table} component={Paper}>
      <div id="scrollTable" style={{ overflow: 'auto', maxHeight: 510 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {hashtags.map((row) => (
              <TableRow
                key={row.name}
                className={classes.tableRow}
                onClick={() =>
                  handleClick(ROUTE_PATHS.feed(`hashtag=${row.name}`))
                }
              >
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width="10%"
                >
                  <Avatar>#</Avatar>
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  align="left"
                  width={smallMobile ? '20%' : '30%'}
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableCell} align="left">
                  {row.count === 1 ? '1 post' : `${row.count} posts`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default SearchListHashtags;
