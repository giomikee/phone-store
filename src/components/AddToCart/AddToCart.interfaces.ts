export interface Props {
    onAddToCart: () => void;
    brand?: string;
    name?: string;
    disabled?: boolean;
    price?: number;
}