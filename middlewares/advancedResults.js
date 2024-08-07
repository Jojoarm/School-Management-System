//model, populate

const advancedResults = (model, populate) => {
  return async (req, res, next) => {
    let Query = model.find();
    //convert query string to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //populate
    if (populate) {
      Query = Query.populate(populate);
    }

    //filtering
    if (req.query.name) {
      Query = Query.find({
        name: { $regex: req.query.name, $options: 'i' },
      });
    }

    // Pagination result
    const pagination = {};
    // add next
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    //add previous
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // execute query
    const data = await Query.find().skip(skip).limit(limit);
    res.results = {
      pagination,
      total,
      status: 'success',
      message: 'Users fetched successfully',
      data: data,
    };

    next();
  };
};

module.exports = advancedResults;
