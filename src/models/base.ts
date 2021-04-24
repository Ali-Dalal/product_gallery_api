
import { Model } from 'objection';
import config from '@config';
import knexfile from '../knexfile';
import * as knex from 'knex';
Model.knex(knex(knexfile[<never>config.NODE_ENV]));
export default Model;


