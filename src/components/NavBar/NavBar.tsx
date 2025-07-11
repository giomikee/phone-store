import { AppBar, Box, Container, Toolbar, Typography, } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { HEADINGS, PAGES } from '../../constants';
import NavButton from '../NavButton/NavButton';
import { useNavBar } from './useNavBar';
import { useStoreSelectors } from '../../state/useStoreSelectors';

const NavBar = () => {
    const { cartPhones }= useStoreSelectors();
    const { typographyOptions } = useNavBar();

    return (
        <AppBar>
            <Container>
                <Toolbar 
                    disableGutters 
                    variant='dense'
                >
                    <NavButton
                        size={typographyOptions.buttonSize}
                        to={PAGES.home}
                        startIcon={<HomeIcon />}
                    >
                        Inicio
                    </NavButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'center'}}>
                        <Typography 
                            component={HEADINGS.h1}
                            variant={typographyOptions.titleVariant} 
                        >
                            Phone Store
                        </Typography>
                    </Box>
                    <NavButton
                        color='success'
                        size={typographyOptions.buttonSize}
                        to={PAGES.cart}
                        startIcon={<ShoppingCartIcon />}
                    >
                        {cartPhones.length}
                    </NavButton>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar