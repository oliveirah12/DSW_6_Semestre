// const routes = require("express").Router();
const {Router} = require("express");

const ItemPatrimonioController = require("../controllers/ItemPatrimonioController")

const routes = Router();

// endpoints definidos para a entidade patrimônio
routes.get("/patrimonio", ItemPatrimonioController.listAll);
routes.get("/patrimonio/:patrimonio_id", ItemPatrimonioController.get);
routes.post("/patrimonio", ItemPatrimonioController.add);
routes.delete("/patrimonio/:patrimonio_id", ItemPatrimonioController.remove);

module.exports = routes;
