import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '../utils/cache'

import routesBundle from './routes-bundle';
import exportNaicsBundle from './export-trade-bundle';
import listData from './port-district-codes';
import citysdkKeyCreator from './citysdk-key-input-bundle';
export default composeBundles(
  listData,
  routesBundle,
  exportNaicsBundle,
  citysdkKeyCreator,
  createUrlBundle(),
  createCacheBundle(cache.set),
);