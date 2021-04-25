import { ParsedQs } from 'qs';

export interface SchemaValidatorError {
    title: string;
    source: { source?: { parameter: string }; pointer?: string }
    details: string
}

export interface JoiSchema {
    schema(): {
        // eslint-disable-next-line no-unused-vars
        validateAsync: (body: ObjectAny, opts: { abortEarly: boolean }) => Promise<void>
    }
}

export interface ObjectAny {
    [obj: string]: string | number | ParsedQs | ParsedQs[] | string[] | undefined;
}