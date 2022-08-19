import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import DashboardSchema from '../models/Dashboard'
import CatalogSchema from '../models/Catalog'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Dashboard = mongoose.model('Dashboard', DashboardSchema);
  Catalog = mongoose.model('Catalog', CatalogSchema);

  Values = mongoose.model('Value', ValueSchema);
}

export const dbContext = new DbContext()
