const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true},
});

const CategoryModel = mongoose.model('Category', CategorySchema);

class Category {

  constructor(name) {
      this.name = name;
  }

   static getById(id) {
      return CategoryModel.findById(id);
    }

    static getIdByName(name) {
      return new Promise(function (resolve, reject) {
      CategoryModel.findOne({name: name}, function(err) {})
        .then(value => {
          if (value !== null)
            resolve(value._id);
          else
            resolve(value);
        })
        .catch(err => {console.log("err ", err); reject(err);});
      });
    }

   static getAll() {
    return CategoryModel.find();
    }

  static insert(New) {
      return new CategoryModel(New).save();
  }

  static update(Updated) {
    return new Promise(function (resolve, reject) {
      CategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(Updated._id), Updated, function(err) {})
        .then(() => resolve(Updated))
        .catch(err => { console.log("Id wasn't found: ", Updated._id); reject(err); });
    });
  }

  static deleteById(id)
  {
    return new Promise(function (resolve, reject) {
      Category.getById(id)
      .then(() => CategoryModel.deleteOne({_id: id}, function(err) {}))
      .then(() => resolve(id))
      .catch(err => { console.log("Id wasn't founded: ", id); reject(err); });
    });
  }

  static getPaginatedCategoriesOnPage(requestedPage, maxCategoriesOnPage, requestedString)
    {
      return new Promise(function (resolve, reject) {
          CategoryModel.find({name: {$regex: requestedString, $options: "$i"}})
          .skip((requestedPage - 1) * maxCategoriesOnPage)
          .limit(maxCategoriesOnPage)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    }
    
};

module.exports = Category;
