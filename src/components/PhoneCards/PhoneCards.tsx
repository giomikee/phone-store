import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import type { Props } from './PhoneCards.interfaces';
import { HEADINGS, PAGES, PHONE_ID_PLACEHOLDER, PHONES_GRID } from '../../constants';
import PhoneChips from '../PhoneChips/PhoneChips';
import { useNavigate } from 'react-router-dom';

const PhoneCards = ({ phones }: Props) => {
    const navigate = useNavigate();
    const goToPhonePage = (id: string) => navigate(PAGES.phone.replace(PHONE_ID_PLACEHOLDER, id));

    return (
        <>
            {
                phones.map(({id, brand, name, basePrice, imageUrl}, index) => 
                    <Grid 
                        key={`${id}_${index}`}  // Workaround for duplicated phones in API - XMI-RN13P5G
                        size={PHONES_GRID}
                    >
                        <Card>
                            <CardActionArea 
                                data-testid={`phone-card-action-area-${id}_${index}`}
                                onClick={() => goToPhonePage(id)}
                            >
                                <CardMedia
                                    component="img"
                                    image={imageUrl}
                                    height="300"
                                    alt={`${brand} ${name}`}
                                />
                                <CardContent>
                                    <PhoneChips
                                        brand={brand} 
                                        basePrice={basePrice} 
                                        brandChipStyle={{ 
                                            mr: '4px',
                                            mb: {
                                                xs: '4px',
                                                md: 0,
                                            }
                                        }}
                                    />
                                    <Typography 
                                        component={HEADINGS.h3}
                                        variant={HEADINGS.h6}
                                    >
                                        {name}
                                    </Typography>
                                    
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            }
        </>
    )
}

export default PhoneCards