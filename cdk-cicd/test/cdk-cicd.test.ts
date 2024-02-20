import { handler } from "../services/hello";

describe('first', () => { 
    
    test('initial test', async () => {
        const result = await handler({}, {});
        expect(result.statusCode).toBe(200);
    });
    
 })