const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  name: { type: String, required: true},
  category: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  imageUrl: {type: String, required: false},
  price: {type: Number, required: true},
  description: {type: String, required: false},
  gridCols: {type: Number, required: true, default: 2}
});

const ArtModel = mongoose.model('Art', ArtSchema);

class Art {

  constructor(name, category, createdAt, imageUrl, price, description, gridCols) {
      this.name = name;
      this.category = category;
      this.createdAt = createdAt;
      this.imageUrl = imageUrl;
      this.price = price;
      this.description = description;
      this.gridCols = gridCols;
  }

  static getByCategory(_category) {
      if (_category !== "")
      {
        return ArtModel.find({category: _category});
      }
      else
        return ArtModel.find()
          .catch(err => console.log(err));
  }

   static getById(id) {
      return ArtModel.findById(id);
    }

   static getAll() {
      return ArtModel.find();
    }

  static insert(New) {
      return new ArtModel(New).save();
  }

  static update(Updated) {
    return new Promise(function (resolve, reject) {
      ArtModel.findByIdAndUpdate(Updated._id, Updated, function(err) {})
        .then(() => resolve(Updated))
        .catch(err => { console.log("Id wasn't founded: ", Updated._id); reject(err); });
    });
  }

  static deleteById(id)
  {
    return new Promise(function (resolve, reject) {
      Art.getById(id)
      .then(value => {
        ArtModel.deleteOne({_id: id}, function(err) {});
          return Promise.resolve(value);
        })
      .then (() => resolve(id))
      .catch(err => { console.log("Id wasn't founded: ", id); reject(err); });
    });
  }

  static getMaxSearchedPage(maxArtsOnPage, requestedString, _category)
  {
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .then(data => resolve(Math.ceil(data.length/maxArtsOnPage)))
        .catch(err => reject(err));
      });
  }

  static getPaginatedArtsOnPage(requestedPage, maxArtsOnPage, requestedString, _category, sortType)
  {
    if (Number(sortType) === 0)
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .sort({name: 1})
        .skip((requestedPage - 1) * maxArtsOnPage)
        .limit(maxArtsOnPage)
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    if (Number(sortType) === 1)
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .sort({createdAt: -1})
        .skip((requestedPage - 1) * maxArtsOnPage)
        .limit(maxArtsOnPage)
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    if (Number(sortType) === 2)
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .sort({createdAt: 1})
        .skip((requestedPage - 1) * maxArtsOnPage)
        .limit(maxArtsOnPage)
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    if (Number(sortType) === 3)
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .sort({price: 1})
        .skip((requestedPage - 1) * maxArtsOnPage)
        .limit(maxArtsOnPage)
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
    if (Number(sortType) === 4)
      return new Promise(function (resolve, reject) {
        ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .sort({price: -1})
        .skip((requestedPage - 1) * maxArtsOnPage)
        .limit(maxArtsOnPage)
        .then(data => resolve(data))
        .catch(err => reject(err));
      });
  }

  static getAllSearchedArts(requestedString, _category)
  {
    return new Promise(function (resolve, reject) {
      ArtModel.find({name: {$regex: requestedString, $options: "$i"}, category: {$regex: _category, $options: "$i"}})
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
    
};

module.exports = Art;
