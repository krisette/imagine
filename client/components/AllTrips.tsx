import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  createStyles, Table, Checkbox,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

const dayjs = require('dayjs');

const GET_ALL_TRIPS = gql`
  query {
    getAllTrips {
      id
      start_date
      end_date
      resort
      hotel
    }
  }
`;

export default function AllTrips() {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  const { data, loading, error } = useQuery(GET_ALL_TRIPS);
  if (loading) return <div className="component">Loading...</div>;
  if (error) return <div className="component">{error.message}</div>;

  const toggleRow = (id: string) => setSelection((current) => (current.includes(id) ? current.filter((item: any) => item !== id) : [...current, id]));
  const toggleAll = () => setSelection((current) => (current.length === data.getAllTrips.length ? [] : data.getAllTrips.map((item: any) => item.id)));

  const rows = data.getAllTrips.map((item: any) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>{`${dayjs(item.start_date).format('M/D/YY')} - ${dayjs(item.end_date).format('M/D/YY')}`}</td>
        <td>{item.resort}</td>
        <td>{item.hotel}</td>
      </tr>
    );
  });

  return (
    <Table sx={{ margin: 100 }} verticalSpacing="sm">
      <thead>
        <tr>
          <th style={{ width: 40 }}>
            <Checkbox
              onChange={toggleAll}
              // checked={selection.length === data.length}
              // indeterminate={selection.length > 0 && selection.length !== data.length}
              transitionDuration={0}
            />
          </th>
          <th>Dates</th>
          <th>Resort</th>
          <th>Hotel</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
