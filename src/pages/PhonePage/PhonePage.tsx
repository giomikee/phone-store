import { HEADINGS } from '../../constants';
import { Box, Container, Divider, Grid, Skeleton, Typography } from '@mui/material';
import PhoneTitle from '../../components/PhoneTitle/PhoneTitle';
import PhoneDescription from '../../components/PhoneDescription/PhoneDescription';
import PhoneColorSelect from '../../components/PhoneColorSelect/PhoneColorSelect';
import PhoneStorageSelect from '../../components/PhoneStorageSelect/PhoneStorageSelect';
import AddToCart from '../../components/AddToCart/AddToCart';
import PhoneCards from '../../components/PhoneCards/PhoneCards';
import { usePhonePage } from './usePhonePage';

const PhonePage = () => {
    const {
        phoneDetails,
        selectedColor,
        selectedStorage,
        updateSelectedColor,
        updateSelectedStorage,
        handleAddToCart,
    } = usePhonePage();

    return (
        <Container>
            <PhoneTitle phoneDetails={phoneDetails} />

            <Divider sx={{ my: 2 }} />

            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12, md: 6,}}>
                    <Box sx={{ flexGrow: 1, textAlign: 'center'}}>
                        {
                            phoneDetails 
                                ? <img 
                                    alt={`${phoneDetails.brand} ${phoneDetails.name}`}
                                    src={selectedColor?.imageUrl ?? phoneDetails.colorOptions![0].imageUrl}
                                    width='100%' />
                                : <Skeleton height={500} />
                        }
                    </Box>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                    <PhoneDescription phoneDetails={phoneDetails} />
                </Grid>

                <Grid size={12}>
                    <Divider />
                </Grid>
                
                <Grid size={6}>
                    <PhoneColorSelect 
                        selectedColor={selectedColor?.hexCode}
                        colorOptions={phoneDetails?.colorOptions} 
                        onSelectedColor={updateSelectedColor} 
                    />
                </Grid>
                
                <Grid size={6}>
                    <PhoneStorageSelect
                        selectedStorage={selectedStorage?.capacity}
                        storageOptions={phoneDetails?.storageOptions}
                        onSelectedStorage={updateSelectedStorage}
                    />
                </Grid>

                <Grid offset={{ md: 6 }} width='100%'>
                    <AddToCart
                        disabled={!selectedStorage || !selectedColor}
                        brand={phoneDetails?.brand}
                        name={phoneDetails?.name}
                        price={selectedStorage?.price}
                        onAddToCart={handleAddToCart}
                    />
                </Grid>

                <Grid size={12}>
                    <Divider />
                </Grid>

                <Grid 
                    container
                    size={12}
                    spacing={2}
                >
                    <Grid size={12}>
                        <Typography 
                            component={HEADINGS.h2}
                            variant={HEADINGS.h5}
                        >
                            Productos similares
                        </Typography>
                    </Grid>

                    <PhoneCards phones={phoneDetails?.similarProducts || []} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PhonePage