const url = `api`

describe('module: user', () => {
    test('operation: create user', () => {
        const res = await fetch(`http://${url}/api/v1/users?`, {
            method: "POST",
            body: `
            {
                "email":"john@example.net",
                "password_hash":"5f4dcc3b5aa765d61d8327deb882cf99"
            }
            `
        })
        expect(res.status).toBe(200);
    });
});