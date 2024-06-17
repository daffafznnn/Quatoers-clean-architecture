import IQuoteRepository from "../../interfaces/IQuoteRepository.js";
import Quote from "../../../models/sql/QuoteModel.js";
import User from "../../../models/sql/UsersModel.js";

class QuoteRepository extends IQuoteRepository {
  async create(quote) {
    return Quote.create(quote);
  }
  async findAllByUserId(userId) {
    return Quote.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: {
        userId,
      },
    });
  }
}

export default new QuoteRepository();
