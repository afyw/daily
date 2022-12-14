const service = require('../service/comment.service');
class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await service.create(momentId, content, id);
    ctx.body = result;
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, id, commentId);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    ctx.body = '修改评论' + commentId + content;
    const result = await service.update(commentId, content);
    return result;
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
    return result;
  }
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
