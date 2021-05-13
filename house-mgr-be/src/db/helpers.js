const getMeta = () => {
  return {
    createAt: {
      type: Number,
      default: (new Date()).getTime(),
    },
    updateAt: {
      type: Number,
      default: (new Date()).getTime(),
    },
  }
}

const preSave = function(next) {
  if (this.isNew) {
    const ts = Date.now();

    this['meta'].createdAt = ts;
    this['meta'].updatedAt = ts;
  } else {
    this['meta'].updatedAt = Date.now();
  }

  next();
};

module.exports = {
  getMeta,
  preSave,
}