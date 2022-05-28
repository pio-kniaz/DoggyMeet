import React from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { Link, LinkProps } from '@chakra-ui/react';

interface ICustomLink extends LinkProps, Omit<ReactRouterLinkProps, 'color'> {
  children?: JSX.Element | string;
}
function CustomLink({ children = '', ...props }: ICustomLink) {
  return (
    <Link as={ReactRouterLink} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;
