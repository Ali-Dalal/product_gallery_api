import { getSecretFromSecretManager } from '@utils/aws';
import * as logger from '@logger';
import configuration from './index';
import * as SecretsManager from 'aws-sdk/clients/secretsmanager';
const retrievedSecrets = <never>{};
let isReady = false;

/**
 * Build the config during the runtime. it is very important to cal this function
 * in the very top level of your code in order to fetch secret values from AWS SM
 * in our case, we need to call this function in every lambda function
 * @returns {Promise<void>}
 */
export default async function(): Promise<void>{
    if (isReady) {
        return;
    }
    logger.write('Building config');
    await iterateAndBuildConfig(configuration);
    //After reading Auth config from secret manager, reset the config
    isReady = true;
}

/**
 * iterate over config variables to resolve each variable starts with aws_sm:
 * @param obj
 * @returns {Promise<void>}
 */
async function iterateAndBuildConfig(obj:any):Promise<void> {
    for (const key of Object.keys(obj)) {
        if (obj[key] && typeof obj[key] === 'object') {
            await iterateAndBuildConfig(obj[key]);
        } else {
            if (typeof obj[key] === 'string' && obj[key].startsWith('aws_sm:')) {
                obj[key] = await retrieveSecret(obj[key].substr(7));
            }
        }
    }
}

async function retrieveSecret(key:string):Promise<void> {
    const arr = key.split('?');
    const secretName = arr[0];
    const secretKey = arr[1];
    if (retrievedSecrets[<never>secretName]) {
        return retrievedSecrets[<never>secretName][secretKey];
    }
    const awsSecret:SecretsManager.GetSecretValueResponse = await getSecretFromSecretManager(`${secretName}`);
    retrievedSecrets[secretName] = <never>JSON.parse(<never>awsSecret.SecretString);
    return retrievedSecrets[secretName][secretKey];
}
