import { handler } from "../../src/services/monitor/handler"

describe('Monitor lambda tests', () => {

    const fetchSpy = jest.spyOn(global, 'fetch');
    fetchSpy.mockImplementation(() => Promise.resolve({} as any));

    test('makes requests for records in SnsEvents', async () => {
        await handler({
            Records: [{
                Sns: {
                    Message: 'Test message'
                }
            }]
        } as any, {});

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
            method: 'POST',
            body: JSON.stringify({
                "text": `Houston, we have a problem: Test message`
            })
        })
    });

    test('makes requests for records in SnsEvents', async () => {
        await handler({
            Records: []
        } as any, {});

        expect(fetchSpy).not.toHaveBeenCalled();
    });
})