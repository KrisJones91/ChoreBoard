import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CatalogService {


  // async getAll(id) {
  //   return await dbContext.Catalog.find({dashId: id}).populate('author','name id')
  // }

  //in connection with DashboardController
  async getAllCatalogsByDashboard(query) {
    return await dbContext.Catalog.find(query).populate('author', 'name id')
  }

  async createCatalog(body) {
    return await dbContext.Catalog.create(body)
  }

  async deleteCatalog(id) {
    const catalog = await dbContext.Catalog.findByIdAndDelete(id)
    if (!catalog) {
      throw new BadRequest('This ID does not exist')
    }
    return 'Successfully Deleted'
  }

}

export const catalogService = new CatalogService()
