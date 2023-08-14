const Comment = require("../schema/commentModel");

// Create a new comment
exports.retrieveComment = async (req, res) => {
  try {
    const { name, comment, rating, productId } = req.body;

    const newComment = new Comment({
      name,
      comment,
      rating,
      product: productId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};


// Retrieve all comments
exports.getComments = async (req, res) => {
  try {
    const { productId } = req.query;
    let comments;

    if (productId) {
      comments = await Comment.find({ product: productId });
    } else {
      comments = await Comment.find();
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

