import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class DashboardService{
  async getAll(id) {
    return await dbContext.Dashboard.find({authorId: id}).populate('author','id')
  }

  async getOne(id) {
    const Dashboard = await dbContext.Dashboard.findById(id)
    if (!Dashboard) {
      throw new BadRequest('Invalid ID')
    }
    return Dashboard
  }

  async createDashboard(body) {
    return await dbContext.Dashboard.create(body)
  }

}
export const dashboardService = new DashboardService()
