import nc from 'next-connect';
import helmet from 'helmet';
import logger from 'morgan';
import { NextApiRequest, NextApiResponse } from 'next';

const common = nc<NextApiRequest, NextApiResponse>();

common
  .use(logger('dev'))
  .use(helmet())

export default common;