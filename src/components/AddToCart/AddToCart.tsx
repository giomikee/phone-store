import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { Props } from './AddToCart.interfaces';
import { formatPrice } from '../../utils';
import { useAddToCart } from './useAddToCart';
import './AddToCart.css';

const AddToCart = ({ disabled, brand, name, price, onAddToCart }: Props) => {
    const { addToCart, isSnackbarOpen, setIsSnackbarOpen }= useAddToCart(onAddToCart);


    return (
        <Stack 
            className='add-to-cart'
            spacing={2}
            gap={1}
            alignItems='center'
            sx={{
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row',
                }
            }}
        >
            <Button
                color='success'
                data-testid='add-to-cart-button'
                disabled={disabled}
                onClick={addToCart}
                size='large'
                startIcon={<AddShoppingCartIcon />}
                variant='contained'
                sx={{
                    width: {
                        xs: '100%',
                        md: 'auto'
                    }
                }}
            >
                Añadir al carrito
            </Button>

            {
                price &&
                    <Typography
                        className='add-to-cart__price'
                        color='primary'
                        component='h3'
                        data-testid='add-to-cart-price'
                        variant='h5'
                    >
                        {formatPrice(price)}
                    </Typography>
            }

            <Snackbar 
                data-testid='add-to-cart-snackbar'
                open={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                autoHideDuration={2000}
            >
                <Alert
                    severity='success'
                    variant='filled'
                >
                    {brand} {name} añadido al carrito
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default AddToCart