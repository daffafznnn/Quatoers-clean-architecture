import Quote from "../models/QuoteModel.js";
import User from "../models/UsersModel.js";

class QuoteRepository {
  async create(quote) {
    return Quote.create(quote);
  }
  async findAllByUserId(userId) {
    return Quote.findOne({
      include: [{
        model: User
      }],
      where: {
        userId
      }
    });
  }
}

export default new QuoteRepository;