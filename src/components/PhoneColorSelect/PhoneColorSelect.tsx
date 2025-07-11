import { FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import type { Props } from './PhoneColorSelect.interfaces';

const PhoneColorSelect = ({ colorOptions, selectedColor, onSelectedColor }: Props) => {
    if (!colorOptions) {
        return <Skeleton height={32} />
    }

    return (
        <FormControl
            fullWidth 
            variant='filled'
        >
            <InputLabel 
                htmlFor='color-select'
                id='color-select-label'
            >
                Color
            </InputLabel>

            <Select
                color={selectedColor ? 'success' : undefined}
                id='color-select'
                data-testid='color-select'
                name='color-select'
                label='Color'
                labelId='color-select-label'
                value={selectedColor ?? ''}
                onChange={(e) => onSelectedColor(e.target.value)}
            >
                {
                    colorOptions.map(({ hexCode, name }) => (
                        <MenuItem 
                            key={hexCode} 
                            value={hexCode}
                            sx={{ color: hexCode }}
                        >
                            {name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default PhoneColorSelect