import { AuthService } from "./AuthService";


async function testAuth(){
    const service = new AuthService();
    const loginResult = await service.login(
        'david.franzel',
        'Qwe123$$'
    )
    console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();