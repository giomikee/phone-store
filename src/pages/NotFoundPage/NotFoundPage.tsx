import { Box, Button, Typography } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import UndoIcon from '@mui/icons-material/Undo';
import { Link } from 'react-router-dom';
import { PAGES } from '../../constants';

const NotFoundPage = () => {
    return (
        <>
            <ReportIcon 
                color='error'
                sx={{
                    height: '150px',
                    width: '100%'
                }}
            />

            <Box sx={{ flexGrow: 1, textAlign: 'center'}}>
                <Typography 
                    component='h2' 
                    gutterBottom
                    variant='h5'
                >
                    Página no encontrada.
                </Typography>

                <Link to={PAGES.home}>
                    <Button
                        startIcon={<UndoIcon />}
                        variant='outlined'
                    >
                        Volver al inicio
                    </Button>
                </Link>
            </Box>
        </>
    )
}

export default NotFoundPage