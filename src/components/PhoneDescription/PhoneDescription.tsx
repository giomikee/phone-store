import { Box, List, ListItem, ListItemText, Skeleton, Stack, Typography } from '@mui/material';
import type { Phone, Specs } from '../../interfaces';
import { HEADINGS, SPECS_TRANSLATIONS } from '../../constants';

const PhoneDescription = ({phoneDetails}: {phoneDetails: Phone | null}) => {
    if (!phoneDetails) {
        return <Skeleton height={500} />
    }
    
    return (
        <Stack spacing={2}>
            <Box>
                <Typography 
                component={HEADINGS.h3}
                variant={HEADINGS.h6}
                color='info'
                >
                Descripción
                </Typography>
                
                <Typography component='p' variant='body1'>
                {phoneDetails.description}
                </Typography>
            </Box>
            
            <Box>
                <Typography 
                component={HEADINGS.h3}
                variant={HEADINGS.h6}
                color='info'
                >
                Especificaciones
                </Typography>
                
                <List dense>
                {Object.keys(phoneDetails.specs!).map((specKey) => (
                    <ListItem key={specKey}>
                    <ListItemText
                    primary={SPECS_TRANSLATIONS[specKey as keyof typeof SPECS_TRANSLATIONS]}
                    secondary={phoneDetails.specs![specKey as keyof Specs]}
                    />
                    </ListItem>
                ))}
                </List>
            </Box>
        </Stack>
    )
}

export default PhoneDescription