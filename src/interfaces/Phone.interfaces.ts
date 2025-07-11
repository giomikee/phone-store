export interface Specs {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
}

export interface ColorOption {
    name: string;
    hexCode: string;
    imageUrl: string;
}

export interface StorageOption {
    capacity: string;
    price: number;
}

export interface Phone {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    description?: string;
    rating?: number;
    specs?: Specs;
    colorOptions?: ColorOption[];
    storageOptions?: StorageOption[];
    similarProducts?: Phone[];
    imageUrl?: string;
}

