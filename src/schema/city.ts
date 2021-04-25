import * as joi from 'joi';

export const getCities = {
    schema: (): joi.ObjectSchema => {
        return joi.object().keys({
            page: joi.number().positive().default(1),
            filter: joi.object().keys({
                name: joi.string().optional().allow(''),
                query: joi.string().optional().allow(''),
            })
        });
    }
};
export const getCityWithProductAndRelatedBrochures = {
    schema: (): joi.ObjectSchema => {
        return joi.object().keys({
            city_name: joi.string().required(),
            product_name: joi.string().required()
        });
    }
};