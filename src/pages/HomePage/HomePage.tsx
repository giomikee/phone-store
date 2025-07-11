import { Container, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { HEADINGS, INITIAL_PHONES_COUNT, PHONES_GRID } from '../../constants';
import LoadAllPhones from '../../components/LoadAllPhones/LoadAllPhones';
import SearchPhonesInput from '../../components/SearchPhonesInput/SearchPhonesInput';
import PhoneCards from '../../components/PhoneCards/PhoneCards';
import { useHomePage } from './useHomePage';
import { useStoreSelectors } from '../../state/useStoreSelectors';

const HomePage = () => {
    const { areSearchResultsDisplayed } = useStoreSelectors();
    const {
        isLoading,
        isInitialLoad,
        isLoadingSearch,
        visiblePhones,
        setIsLoadingSearch,
        setIsInitialLoad,
    }= useHomePage();

    return (
        <Container>
            <Typography 
                component={HEADINGS.h2}
                variant={HEADINGS.h5}
            >
                Buscar Móviles
            </Typography>

            <Divider sx={{ my: 2 }} />

            {
                isLoading 
                ? <Skeleton
                    height={80} 
                    variant='text' />
                : <SearchPhonesInput onSearchLoading={setIsLoadingSearch} />
            }

            <Divider sx={{ my: 2 }} />

            <Grid 
                container
                spacing={2}
            >
                {
                    (isLoading || isLoadingSearch) && Array.from({ length: INITIAL_PHONES_COUNT }).map((_, index) => 
                        <Grid 
                            key={index}
                            size={PHONES_GRID}
                        >
                            <Skeleton 
                                height={400} 
                                variant='rectangular'
                            />
                        </Grid>
                    )
                }

                <PhoneCards phones={visiblePhones} />

                {
                    !isLoading && !areSearchResultsDisplayed && isInitialLoad && 
                        <LoadAllPhones onLoadAll={() => setIsInitialLoad(false)} />
                }
            </Grid>
        </Container>
    )
}

export default HomePage