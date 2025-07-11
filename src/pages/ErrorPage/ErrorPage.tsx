import { Box, Button, Typography } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import UndoIcon from '@mui/icons-material/Undo';
import { Link } from 'react-router-dom';
import { PAGES } from '../../constants';

const ErrorPage = () => {
    return (
        <>
            <BugReportIcon 
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
                    Error técnico detectado. Intentélo de nuevo más tarde.
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

export default ErrorPage