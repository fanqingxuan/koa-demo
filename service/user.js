const BaseService = require("./base");

class UserService extends BaseService {
    async findUser(id) {
        return await this.models.User.find(id);
    }

    async findAll() {
        this.logger.debug("findAll", "这是findAll");
        const list = await this.models.User.findAll();
        this.logger.info("findAll", list);
        this.logger.error("error",list);
        return list;
    }

    async create(data) {
        return await this.models.User.create(data);
    }

    async find(id) {
        return await this.models.User.findByPk(id);
    }

    async findUserByName(username) {
        return await this.models.User.findOne({
            where: { name: username || "" },
        });
    }
}

module.exports = new UserService();
