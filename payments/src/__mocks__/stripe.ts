export const stripe = {
    charges: {

        create: jest.fn().mockResolvedValue({}),//return a  promise that immediately resolves itself
    },
};