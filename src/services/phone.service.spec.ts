import { describe, expect, it, vi } from 'vitest';
import { getPhone, getPhones } from './phone.service';

const mockFetch = (mockedResponse: { ok: boolean, json?: () => void; }) => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce(mockedResponse);
};

describe('Given phone service', () => {
    describe('When getPhones is called', () => {
        describe('And request fails', () => {
            it('Then it should throw error', async () => {
                mockFetch({ ok: false });

                try {
                    await getPhones();
                } catch (error) {
                    expect(error).toEqual({ ok: false });
                }
            });
        });

        describe('And request is successful', () => {
            it('Then it should return the response', async () => {
                const response = { ok: true, json: vi.fn() };
                mockFetch(response);

                await getPhones();
                expect(response.json).toHaveBeenCalled();
            });
        });
    });

    describe('When getPhone is called', () => {
        describe('And request fails', () => {
            it('Then it should throw error', async () => {
                mockFetch({ ok: false });

                try {
                    await getPhone('id');
                } catch (error) {
                    expect(error).toEqual({ ok: false });
                }
            });
        });

        describe('And request is successful', () => {
            it('Then it should return the response', async () => {
                const response = { ok: true, json: vi.fn() };
                mockFetch(response);

                await getPhone('id');
                expect(response.json).toHaveBeenCalled();
            });
        });
    });
});