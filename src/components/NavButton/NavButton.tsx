import { NavLink } from 'react-router-dom';
import type { Props } from './NavButton.interfaces';
import { Button } from '@mui/material';

const NavButton = ({ color, children, size, startIcon, to }: Props) => {
    return (
        <NavLink to={to}>
            {
                ({isActive}) => (
                    <Button 
                        color={color}
                        size={size}
                        startIcon={startIcon}
                        variant={ isActive ? 'outlined' : 'text'}
                    >
                        {children}
                    </Button>
                )
            }
        </NavLink>
    )
}

export default NavButton