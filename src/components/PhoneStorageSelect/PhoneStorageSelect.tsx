import { FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import type { Props } from './PhoneStorageSelect.interfaces';
import { formatPrice } from '../../utils';

const PhoneStorageSelect = ({ selectedStorage, storageOptions, onSelectedStorage }: Props) => {
    if (!storageOptions) {
        return <Skeleton height={32} />
    }

    return (
        <FormControl fullWidth variant='filled'>
            <InputLabel 
                htmlFor='storage-select'
                id='storage-select-label'
            >
                Almacenamiento
            </InputLabel>

            <Select
                color={storageOptions ? 'success' : undefined}
                id='storage-select'
                data-testid='storage-select'
                name='storage-select'
                label='Almacenamiento'
                labelId='storage-select-label'
                value={selectedStorage ?? ''}
                onChange={(e) => onSelectedStorage(e.target.value)}
            >
                {
                    storageOptions.map(({ capacity, price }) => (
                        <MenuItem 
                            key={capacity} 
                            value={capacity}
                        >
                            {capacity} ({ formatPrice(price) })
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default PhoneStorageSelect