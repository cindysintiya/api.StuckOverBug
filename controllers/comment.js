const commentModel = require("../models/comment");

exports.getById = (req, res) => {
  commentModel
    .find({ ref: req.body.refId })
    .sort({ time: -1 })
    .populate("author")
    .then((comments) => {
      res.status(200).json({ message: `Found ${comments.length} comment(s)`, value: comments });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
}

exports.posting = (req, res) => {
  const comment = new commentModel({
    author: req.body.author,
    ref: req.body.ref,
    contents: req.body.contents,
  });
  
  comment
    .save()
    .then((data) => {
      const newData = {
        ...data._doc,
        author: req.body.author,
      }
      res.status(200).json({ message: "Successfully posted your comment.", value: newData });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}
