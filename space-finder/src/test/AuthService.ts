import { Amplify } from 'aws-amplify';
import { signIn, type SignInInput } from 'aws-amplify/auth';

const awsRegion = 'us-west-2';

// Amplify.configure({
//     aws_project_region: 'us-west-2',
//     aws_cognito_identity_pool_id: 'us-west-2:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
//     aws_cognito_region: 'us-west-2',
//     aws_user_pools_id: 'us-west-2_xxxxxxxxx',
//     aws_user_pools_web_client_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
//     oauth: {},
//     // Additional configuration for other services (API, Storage, etc.) goes here
// })

async function handleSignIn({ username, password }: SignInInput) {
    try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
    } catch (error) {
        console.log('error signing in', error);
    }
}