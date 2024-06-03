import QuoteService from "../services/QuoteService.js";

class QuoteController{
  async createQuote(req, res) {
    try {
      const quote = await QuoteService.createQuote(req.body);
      res.status(201).json(quote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error occurred" });
    }
  }

  async findQuoteByUser(req, res) {
    try {
      const quote = await QuoteService.findQuoteByUser(req.params.userId);
      res
        .status(200)
        .json({
          msg: `successfully get quote data from ${quote.user.username}`,
        });
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Server error occurred" });
    }
  }

}

export default new QuoteController();