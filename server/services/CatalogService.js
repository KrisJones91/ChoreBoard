import { dbContext } from "../db/DbContext"

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

}

export const catalogService = new CatalogService()
