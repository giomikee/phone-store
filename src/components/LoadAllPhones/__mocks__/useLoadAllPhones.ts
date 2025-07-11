import { vi } from 'vitest';

export const useLoadAllPhones = vi.fn().mockReturnValue({
    isLoading: false,
    fetchAllPhones: vi.fn(),
});