import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Box, Button } from '@mui/material';
import type { Props } from './LoadAllPhones.interfaces';
import { useLoadAllPhones } from './useLoadAllPhones';

const LoadAllPhones = ({onLoadAll}: Props) => {
    const {isLoading, fetchAllPhones} = useLoadAllPhones(onLoadAll);

    return (
        <Box sx={{ flexGrow: 1, textAlign: 'center'}}>
            <Button 
                data-testid='load-all-phones-button'
                loading={isLoading}
                onClick={fetchAllPhones}
                startIcon={<ExpandCircleDownIcon />}
                variant='contained'
            >
                Ver todo
            </Button>
        </Box>
    )
}

export default LoadAllPhones