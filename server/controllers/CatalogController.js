import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { catalogService } from "../services/CatalogService"
import { BadRequest } from "../utils/Errors";

export class CatalogController extends BaseController{
  constructor() {
    super('api/catalog')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('/', this.getAll)
      .post('/', this.createCatalog)
      .delete('/:id', this.deleteCatalog)

  }

  async createCatalog(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      res.send(await catalogService.createCatalog(req.body))
    } catch (e) {
      next(e)
    }
  }

  async deleteCatalog(req, res, next) {
    try {
      // if (req.userInfo.id === req.params) {
        res.send(await catalogService.deleteCatalog(req.params.id))
      // } else {
      //   throw new BadRequest('Only the Author can delete a Catalog')
      // }
    } catch (e) {
      next(e)
    }
  }

    // async getAll(req, res, next) {
  //   try {
  //     const catalog = await catalogService.getAll(req.params.dashId)
  //     res.send(catalog)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}
