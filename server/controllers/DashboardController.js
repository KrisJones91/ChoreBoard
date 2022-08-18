import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { dashboardService } from "../services/DashboardService";

export class DashboardController extends BaseController{
  constructor() {
    super('api/dashboards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getAllDashboards)
      .get('/:id', this.getOne)
      .post('/', this.createDashboard)
      .put('/:id', this.editDash)
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
}
