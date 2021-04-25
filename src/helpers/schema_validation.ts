import { ApiError } from '@helpers/errors';
import { SchemaValidatorError, JoiSchema, ObjectAny } from '@types';

export const schemaValidator = async (schema: JoiSchema, body: ObjectAny, queryParams = false): Promise<void> => {
    try {
        return await schema.schema().validateAsync(body, { abortEarly: false });
    } catch (e) {
        const error = e.details;
        const errorArray = [] as SchemaValidatorError[];
        const existsNot = error[0].type === 'any.exist';
        error.forEach((error: { context: { key: never; }; message: never; }) => {
            errorArray.push({
                title: existsNot ? 'Resource Not Found' : 'Validation Error',
                source: queryParams ?
                    { source: { parameter: error.context.key } }
                    : { pointer: error.context.key },
                details: error.message
            });
        });
        const statusCode = existsNot ? 404 : 400;
        throw new ApiError('Schema Validation Error', 1000, statusCode, errorArray);
    }
};