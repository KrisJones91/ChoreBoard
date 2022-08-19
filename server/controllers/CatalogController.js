import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { catalogService } from "../services/CatalogService"

export class CatalogController extends BaseController{
  constructor() {
    super('api/catalog')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/', this.getAll)
      .post('/', this.createCatalog)
  }

  // async getAll(req, res, next) {
  //   try {
  //     const catalog = await catalogService.getAll(req.params.dashId)
  //     res.send(catalog)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async createCatalog(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      res.send(await catalogService.createCatalog(req.body))
    } catch (e) {
      next(e)
    }
  }
}
