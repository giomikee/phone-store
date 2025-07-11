import type { Phone } from '../../interfaces';
import { Rating, Skeleton, Stack, Typography } from '@mui/material';
import PhoneChips from '../PhoneChips/PhoneChips';
import { HEADINGS } from '../../constants';

const PhoneTitle = ({ phoneDetails }: { phoneDetails: Phone | null }) => {

    if (!phoneDetails) {
        return (
            <Stack spacing={1}>
                <Skeleton width={150} />
                <Skeleton width={150} />
                <Skeleton width={200} />
            </Stack>
        )
    }

    return (
        <Stack spacing={1}>
            <PhoneChips 
                basePrice={phoneDetails.basePrice} 
                brand={phoneDetails.brand}
                brandChipStyle={{ mr: '4px' }} /> 
            
            <Stack direction='row' spacing={1}>
                <Rating
                    defaultValue={phoneDetails.rating}
                    value={phoneDetails.rating}
                    precision={0.5}
                    readOnly 
                />

                <Typography component='span'>
                    {phoneDetails.rating} de 5 estrellas
                </Typography>
            </Stack>
            
            <Typography 
                component={HEADINGS.h2}
                variant={HEADINGS.h5}
            >
                {phoneDetails.name}
            </Typography>
        </Stack> 
    )
}

export default PhoneTitle