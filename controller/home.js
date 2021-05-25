const userService = require("../service/user");

const redis = require("../core/redis");
const logger = require("../core/log").logger;
const response_util = require("../util/response");
const Koa = require("koa");// eslint-disable-line

const home = {
    /**
     * @param {Koa.Context} ctx
     */
    async index(ctx) {
        logger.debug("debug关键字", ctx.request.query);
        logger.info("info关键字", ctx.request.query);
        logger.warn("warn关键字", ctx.request.query);
        logger.error("error关键字", ctx.request.query);
        logger.info("userInfo", ctx.user);
        ctx.body = response_util.success(ctx.request.body);
    },

    /**
     * @param {Koa.Context} ctx
     */
    async test(ctx) {
        let test = await redis.get("test");

        redis.set("test", Math.random());
        if (test) {
            ctx.body = test;
        } else {
            ctx.body = "thi si " + (await redis.get("test"));
        }
        ctx.body = response_util.success(ctx.body, "获取列表成功");
    },

    /**
     * @param {Koa.Context} ctx
     */
    async testDb(ctx) {
        let ret = await userService.findUser(ctx.request.query.id || 1);
        ctx.body = response_util.success(ret);
    },

    /**
     * @param {Koa.Context} ctx
     */
    async list(ctx) {
        let list = await userService.findAll();
        ctx.body = response_util.success(list);
    },

    /**
     * @param {Koa.Context} ctx
     */
    async create(ctx) {
        let data = await userService.create({ Name: "范晓杰", Status: "32" });
        ctx.body = response_util.success(data);
    },

    /**
     * @param {Koa.Context} ctx
     */
    async find(ctx) {
        let data = await userService.find(ctx.request.query.id);
        if (!data) {
            ctx.body = response_util.error("用户不存在");
        } else {
            data.Name = "hello";
            data.save();
            ctx.body = response_util.success(data);
        }
    },
};

module.exports = home;
