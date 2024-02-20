import { type CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { Amplify, Auth } from 'aws-amplify';
import * as Outputs from '../outputs.json';

const awsRegion = 'us-west-2';
const userPoolId = Outputs.AuthStack.SpaceUserPoolId;
const identityPoolId = Outputs.AuthStack.SpaceIdentityPoolId;

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: userPoolId,
        userPoolWebClientId: Outputs.AuthStack.SpaceUserPoolClientId,
        identityPoolId: identityPoolId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser) {
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: identityPoolId,
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}