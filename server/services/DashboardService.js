import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class DashboardService{
  async getAll(id) {
    return await dbContext.Dashboard.find({authorId: id}).populate('author','id')
  }

  async createDashboard(body) {
    return await dbContext.Dashboard.create(body)
  }

}
export const dashboardService = new DashboardService()
