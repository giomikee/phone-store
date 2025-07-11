import { Container, Divider, Typography } from '@mui/material';
import { HEADINGS } from '../../constants';
import { getCartTotalPrice } from '../../utils/getCartTotalPrice';
import CartActions from '../../components/CartActions/CartActions';
import CartItems from '../../components/CartItems/CartItems';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog/ConfirmDeleteDialog';
import { useCartPage } from './useCartPage';
import { useStoreSelectors } from '../../state/useStoreSelectors';

const CartPage = () => {
    const { cartPhones } = useStoreSelectors();
    const { isDialogOpen, phoneToRemove, handleClickRemove, handleCloseDialog }= useCartPage();

    return (
        <Container>
            <Typography
                component={HEADINGS.h2}
                variant={HEADINGS.h5}
            >
                Carrito de compra
            </Typography>

            <Divider sx={{ my: 2 }} />

            <CartItems
                onClickRemove={handleClickRemove}
                phones={cartPhones}
            />

            <Divider sx={{ my: 2 }} />

            <CartActions
                totalPrice={getCartTotalPrice(cartPhones)}
                isBuyDisabled={!cartPhones.length}
            />

            {
                isDialogOpen && phoneToRemove &&
                    <ConfirmDeleteDialog
                        onClose={handleCloseDialog}
                        phone={phoneToRemove}
                    />
            }

        </Container>
    )
}

export default CartPage