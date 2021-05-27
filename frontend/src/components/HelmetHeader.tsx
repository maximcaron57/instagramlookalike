import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HelmetHeaderProps {
  title: string;
}

export const HelmetHeader = (props: HelmetHeaderProps) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};
