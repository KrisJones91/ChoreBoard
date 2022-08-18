import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { dashboardService } from "../services/DashboardService";

export class DashboardController extends BaseController{
  constructor() {
    super('api/dashboards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getAllDashboards)
      .post('/', this.createDashboard)
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

  async createDashboard(req, res, next) {
    try {
      req.body.authorId = req.userInfo.id
      res.send(await dashboardService.createDashboard(req.body))
    } catch (e) {
      next(e)
    }
  }
}
