const initModels = require("../models/init-models");
const sequelize = require("../core/db");
const logger = require("../core/log").logger;

class BaseService {


    constructor() {
        let models = initModels(sequelize);
        
        this.models = models;

        this.logger = logger;
    }
}

module.exports = BaseService;
