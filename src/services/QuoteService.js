import QuoteRepository from "../repositories/QuoteRepository.js";

class QuoteService {
  async createQuote(userId, content, res) {
    
    if (!content) {
      res.status(400).json({ msg: "Content quote cannot be empty" });
    }

    return QuoteRepository.create({ userId, content });
  }

  async findQuoteByUser(userId, res) {
    const quote = await QuoteRepository.findAllByUserId(userId);

    if (!quote) {
      res.status(404).json({ msg: "Quote not found" });
    }
    return quote
  }
}

export default new QuoteService();