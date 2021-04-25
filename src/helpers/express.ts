import { Response, Request } from 'express';
import * as Logger from '@logger';
import { NotFoundError } from 'objection';
import { ApiError } from '@helpers/errors';

// eslint-disable-next-line no-unused-vars
type Controller = (req: Request, res: Response) => Promise<unknown>;

/**
 * funnel all express controllers return to express callback function to centralize error handling.
 * it is a common of using clean code architecture in express and nodejs
 * @param controller
 */
export function expressCallback(controller: Controller) {
    return async (req: Request, res: Response): Promise<void> => {
        try {
            const controllerResponse = await controller(req, res);
            controllerResponse && res.send(controllerResponse);
        } catch (e) {
            if (e instanceof NotFoundError) {
                res.status(404).json({
                    message: 'Requested resource does not exist'
                });
            } else if (e instanceof ApiError) {
                res.status(e.httpStatusCode).send({
                    ...e
                });
            } else {
                Logger.error(e);
                res.status(500).send({
                    message: 'unknown error occurred, please try again later'
                });
            }
        }
    };
}