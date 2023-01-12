import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  createStyles, Container, Text, Button, Group,
} from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const GET_UPCOMING_TRIP = gql`
  query {
    getUpcomingTrip {
      start_date
      end_date
      resort
    }
  }
`;

export default function UpcomingTrip() {
  const { data, loading, error } = useQuery(GET_UPCOMING_TRIP);
  const { classes } = useStyles();

  if (loading) return <div className="component">Loading...</div>;
  if (error) return <div className="component">{error.message}</div>;

  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          You&apos;re going to
          {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            {data.getUpcomingTrip.resort}
          </Text>
          {' '}
          in
          {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            {dayjs(data.getUpcomingTrip.start_date).fromNow(true)}
          </Text>
          !
        </h1>

        <Text className={classes.description} color="dimmed">
          Next trip:
          {' '}
          {dayjs(data.getUpcomingTrip.start_date).format('MM/DD/YYYY')}
          {' '}
          -
          {' '}
          {dayjs(data.getUpcomingTrip.end_date).format('MM/DD/YYYY')}
        </Text>
      </Container>
    </div>
  );
}
