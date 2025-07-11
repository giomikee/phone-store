import { FormHelperText, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BackspaceIcon from '@mui/icons-material/Backspace';
import type { Props } from './SearchPhones.interfaces';
import { useSearchPhonesInput } from './useSearchPhonesInput';

const SearchPhonesInput = ({onSearchLoading}: Props) => {
    const {
        keywords,
        setKeywords,
        isLoading,
        resultsText,
    }= useSearchPhonesInput(onSearchLoading)

    return (
        <TextField
            fullWidth
            label={`Buscar Móviles ${resultsText}`}
            id="search-phones-input"
            data-testid="search-phones-input"
            name="search-phones-input"
            slotProps={{
                input: {
                    endAdornment: <>
                        {
                            keywords.length > 0 &&
                                <IconButton 
                                    aria-label='borrar busqueda'
                                    data-testid='clear-search-button'
                                    onClick={() => setKeywords('')}>
                                    <BackspaceIcon />
                                </IconButton>
                        }
                        {isLoading ? <HourglassTopIcon color='disabled' /> : <SearchIcon color='disabled' />}
                    </>,
                },
                formHelperText: <FormHelperText>Weight</FormHelperText>
            }}
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
        />
    )
}

export default SearchPhonesInput