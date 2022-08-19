import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { dashboardService } from "../services/DashboardService";
import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { catalogService } from "../services/CatalogService";

export class DashboardController extends BaseController{
  constructor() {
    super('api/dashboards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getAllDashboards)
      .get('/:id', this.getOne)
      .post('/', this.createDashboard)
      .put('/:id', this.editDash)
      .delete('/:id', this.deleteDash)
      //GetCatalog within each Dashboard
      .get('/:id/catalog', this.getCatalogs)
  }

  async getCatalogs(req, res, next) {
    try {
      return res.send(await catalogService.getAllCatalogsByDashboard({ dashId: req.params.id }))
    } catch (e) {
      next(e)
    }
  }

  async getAllDashboards(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      const dashboards = await dashboardService.getAll(req.body.authorId)
      res.send(dashboards)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await dashboardService.getOne(req.params.id))
    } catch (e) {
      next(e)
    }
  }

  async createDashboard(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      res.send(await dashboardService.createDashboard(req.body))
    } catch (e) {
      next(e)
    }
  }

  async editDash(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await dashboardService.editDash(req.params.id, req.body))
    } catch (e) {
      next(e)
    }
  }

  async deleteDash(req, res, next) {
    try {
      res.send(await dashboardService.deleteDashboard(req.params.id))
    } catch (e) {
      next(e)
    }
  }

}
