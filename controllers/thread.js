const threadModel = require("../models/thread");

exports.getAll = (req, res) => {
  const filter = req.body.filter || "";
  threadModel
    .find({ type: "question", contents: new RegExp(filter, "i") })
    .sort({ status: -1, time: 1 })
    .populate("author")
    .then((threads) => {
      res.status(200).json({ message: `Found ${threads.length} thread(s)`, value: threads });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}

exports.posting = (req, res) => {
  const thread = new threadModel({
    type: req.body.type,
    ref: req.body.ref,
    author: req.body.author,
    contents: req.body.contents,
    snippets: req.body.snippets,
    status: req.body.status,
  });
  
  thread
    .save()
    .then((data) => {
      const newData = {
        ...data._doc,
        author: req.body.author,
      }
      res.status(200).json({ message: `Successfully posted your ${req.body.type}.`, value: newData });
    })
    .catch((err) => {
      if (err.message.toLowerCase().includes('validation')) {
        if (req.body.type == "question") {
          return res.status(400).json({ message: "You must write down your question so other SOBug can help you fixing your code. What can we solve if you don't provide your question? X(" });
        } else if (req.body.type == "answer") {
          return res.status(400).json({ message: "You must write down your answer so the SOBug Asker can solve their code. X(" });
        }
      }
      res.status(500).json({ message: err.message });
    });
}

exports.detail = (req, res) => {
  threadModel
    .findOne({ _id: req.body.id, type: "question" })
    .populate("author")
    .then((thread) => {
      threadModel
        .find({ ref: req.body.id, type: "reply" })
        .sort({ time: -1 })
        .populate("author")
        .then((replies) => {
          res.status(200).json({ message: "We found your thread!", thread: thread, replies: replies });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
      // res.status(200).json({ message: "We found your thread!", value: thread });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}

exports.closed = (req, res) => {
  threadModel
    .findOneAndUpdate({ _id: req.body.id, type: "question" }, { status: 0 }, { new: true })
    .then((thread) => {
      res.status(200).json({ message: "Successfully closing your selected thread.", value: thread });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}