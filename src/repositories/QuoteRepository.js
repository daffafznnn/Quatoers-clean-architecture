import Quote from "../models/QuoteModel.js";

class QuoteRepository {
  async create(quote) {
    return Quote.create(quote);
  }
  async findAllByUserId(userId) {
    return Quote.findOne({
      where: {
        userId
      }
    });
  }
}

export default new QuoteRepository;