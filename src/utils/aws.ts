import * as SecretsManager from 'aws-sdk/clients/secretsmanager';
import * as Logger from '@logger/index';
const secretsManager = new SecretsManager();
export const getSecretFromSecretManager = (secretName: string, versionId?: string): Promise<SecretsManager.GetSecretValueResponse> => {
    Logger.write('getting secret from secret manager config for ' + secretName);
    versionId && Logger.write(`version id: ${versionId}`);
    const params = {
        SecretId: secretName,
        VersionId: versionId
    };
    return secretsManager.getSecretValue(params).promise();
};