import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import type { Props } from './CartItems.interfaces';
import { formatPrice } from '../../utils';

const CartItems = ({ onClickRemove, phones }: Props) => {
    if (!phones.length) {
        return (
            <Typography textAlign='center'>
                No hay móviles en el carrito.
            </Typography>
        )
    }

    return (
        <List>
                {
                    phones.map((phone, index) => (
                        <ListItem 
                            key={`${phone.id}_${index}`}
                            secondaryAction={
                                <IconButton 
                                    aria-label='delete'
                                    color='error'
                                    data-testid={`remove-phone-button-${phone.id}_${index}`}
                                    onClick={() => onClickRemove(phone, index)}
                                >
                                    <RemoveShoppingCartIcon />
                                </IconButton>
                            }
                            >
                            <ListItemAvatar>
                                <Avatar
                                    alt={`${phone.brand} ${phone.name}`} 
                                    src={phone.selectedColor.imageUrl} 
                                />
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Stack 
                                        sx={{
                                            flexDirection: {
                                                sx: 'column',
                                                md: 'row'
                                            }
                                        }}
                                    >
                                        <Typography component='span' sx={{ mr: 1 }}>
                                            {phone.brand} {phone.name}
                                        </Typography>
                                        <Typography component='span'>
                                            ({formatPrice(phone.selectedStorage.price)})
                                        </Typography>
                                    </Stack>
                                }
                                secondary={
                                    <Stack component='span'>
                                        <Typography 
                                            component='span'
                                            variant='body2' 
                                        >
                                            Color: {phone.selectedColor.name}
                                        </Typography>
                                        <Typography 
                                            component='span'
                                            variant='body2' 
                                        >
                                            Almacenamiento: {phone.selectedStorage.capacity}
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </ListItem>
                    ))
                }
            </List>
    )
}

export default CartItems