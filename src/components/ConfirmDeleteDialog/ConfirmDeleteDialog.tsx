import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import UndoIcon from '@mui/icons-material/Undo';
import type { Props } from './ConfirmDeleteDialog.interfaces';

const ConfirmDeleteDialog = ({ onClose, phone }: Props) => {
    return (
        <Dialog
            open
            onClose={() => onClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirmar acción
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Eliminar {phone.brand} {phone.name}? 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    data-testid='cancel-button'
                    onClick={() => onClose(false)}
                    startIcon={<UndoIcon />}
                    variant='contained'
                >
                    Cancelar
                </Button>
                
                <Button
                    color='error'
                    data-testid='confirm-button'
                    onClick={() => onClose(true)}
                    startIcon={<RemoveShoppingCartIcon />}
                    variant='contained'
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog