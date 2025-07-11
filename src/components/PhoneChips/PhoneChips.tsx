import { Box, Chip } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import type { Props } from './PhoneChips.interfaces';
import { SIZES } from '../../constants';
import { formatPrice } from '../../utils';

const PhoneChips = ({brand, basePrice, brandChipStyle}: Props) => {
    return (
        <Box>
            <Chip
                color='primary'
                icon={<SmartphoneIcon />}
                label={brand}
                size={SIZES.small}
                sx={brandChipStyle}
            />
            <Chip
                color='secondary'
                icon={<EuroIcon />}
                label={`desde ${formatPrice(basePrice)}`}
                size={SIZES.small}
            />
        </Box>
    )
}

export default PhoneChips