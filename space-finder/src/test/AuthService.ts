import { type CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';

const awsRegion = 'us-west-2'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'us-west-2_9ekqosm9e',
        userPoolWebClientId: '4bk8bap32gucj9n6cvt0p4ihh',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }
}