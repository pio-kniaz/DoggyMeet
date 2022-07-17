import React from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';

export type CustomLinkProps = Omit<ReactRouterLinkProps, 'color'> &
  LinkProps & {
    children?: JSX.Element | string;
  };

function CustomLink({ children = '', ...props }: CustomLinkProps) {
  return (
    <Link as={ReactRouterLink} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;
