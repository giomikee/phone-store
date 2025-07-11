import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar';
import { Box } from '@mui/material';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Box sx={{mt:9, mb: 2}}>
                <Outlet />
            </Box>
        </>
    )
}

export default MainLayout