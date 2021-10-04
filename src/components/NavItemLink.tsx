import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const NavItemLink: FC<NavLinkProps> = (props) => {
  const { className = 'nav-item', activeClassName = 'active', ...rest } = props;
  return (
    <NavLink className={className} activeClassName={activeClassName} {...rest}>
      {props.children}
    </NavLink>
  );
};
