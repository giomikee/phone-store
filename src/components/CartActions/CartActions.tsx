import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Link } from 'react-router-dom';
import type { Props } from './CartActions.interfaces';
import { formatPrice } from '../../utils';
import { PAGES } from '../../constants';
import { useCartActions } from './useCartActions';

const CartActions = ({ isBuyDisabled, totalPrice }: Props) => {

    const {
        isSnackbarOpen,
        isLoading,
        startCheckout,
        checkoutCart,
    } = useCartActions();

    return (
        <>
            <Stack 
                gap={2}
                justifyContent='space-between'
                sx={{
                    flexDirection: {
                        xs: 'column-reverse',
                        md: 'row'
                    }
                }}
            >
                <Link to={PAGES.home}>
                    <Button
                        data-testid='continue-shopping-button'
                        color='primary'
                        size='large'
                        variant='contained'
                        startIcon={<SmartphoneIcon />}
                        sx={{
                            width: {
                                xs: '100%',
                                md: 'auto',
                            }
                        }}
                    >
                        Continuar comprando
                    </Button>
                </Link>

                <Stack
                    alignItems='center'
                    gap={1}
                    sx={{
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        }
                    }}
                >
                    <Typography
                        color='primary'
                        component='h3'
                        variant='h5'
                        textAlign='center'
                    >
                        Total: {formatPrice(totalPrice)}
                    </Typography>

                    <Button
                        color='success'
                        data-testid='buy-button' 
                        disabled={isBuyDisabled}
                        loading={isLoading}
                        loadingPosition='start'
                        onClick={startCheckout}
                        size='large'
                        startIcon={<CreditScoreIcon />}
                        sx={{
                            width: {
                                xs: '100%',
                                md: 'auto',
                            }
                        }}
                        variant='contained'
                    >
                        Comprar productos
                    </Button>
                </Stack>

            </Stack>

            <Snackbar
                data-testid='cart-actions-snackbar'
                open={isSnackbarOpen}
                onClose={checkoutCart}
                autoHideDuration={2000}
            >
                <Alert
                    severity='success'
                    variant='filled'
                >
                    ¡Gracias por tu compra!
                </Alert>
            </Snackbar>
        </>
    )
}

export default CartActions