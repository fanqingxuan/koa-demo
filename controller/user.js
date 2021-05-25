const response_util = require("../util/response");
const userService = require("../service/user");
const logger = require("../core/log").logger;
const md5 = require("md5");
const redis = require("../core/redis");
const Koa = require("koa");// eslint-disable-line

const user = {
    /**
     * @param {Koa.Context} ctx
     */
    async index(ctx) {
        ctx.body = response_util.success("this is user index page");
    },

    /**
     * @param {Koa.Context} ctx
     */
    async list(ctx) {
        ctx.body = response_util.success("this is user list page");
    },

    /**
     * @param {Koa.Context} ctx
     */
    async create(ctx) {
        const user = ctx.request.body;
        const data = await userService.create(user);
        ctx.body = response_util.success(data);
    },

    /**
     * @param {Koa.Context} ctx
     */
    async login(ctx) {
        logger.info("请求信息", ctx.request.body);

        const username = ctx.request.body.username;
        const pwd = ctx.request.body.pwd || "";
        const md5pwd = md5(pwd);
        const user = await userService.findUserByName(username);
        logger.info("用户信息", user);
        if (!user) {
            ctx.body = response_util.error("用户不存在");
            return;
        }
        if (user.pwd != md5pwd) {
            ctx.body = response_util.error("密码错误");
            logger.info("参数md5密码", md5pwd);
            logger.info("db密码", user.pwd);
            return;
        }
        const token = md5(`${username}${pwd}${username}`);
        await redis.set(token, JSON.stringify(user), "EX", 86400);
        ctx.body = response_util.success({ token: token, user: user });
    },
};

module.exports = user;
