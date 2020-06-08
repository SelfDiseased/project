const express = require('express');
const Art = require("./models/art");
const Category = require("./models/category");

const router = express.Router();

require('dotenv').config();

let send = require('gmail-send')({
  user:    "oldsHerokuapp@gmail.com",
  pass:     process.env.pass,
  to:      "oldsHerokuapp@gmail.com",
  subject: 'test subject',
  text:    'gmail-send promise examples',
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let phoneToken = require('generate-sms-verification-code');
let CODE = [];


const asyncAwaitSend = async(email) => {
  try {
    const code = phoneToken(6, {type: 'string'});
    CODE.push(code);
    const res = await send({
      html:    '<h1>Hey boi</h1><h2>Here is your code for calendar, follow:</h2><h1>' + code + '</h1>',
      to:      email,
      subject: 'Code for calendar from Anastasia Zell'
    });
  } catch (e) {
    console.error('* [promise-example-2] ERROR:', e);
  }
};

const asyncAwaitSendInfoAboutNewClient = async(email, clientEmail, year, month, day, hour) => {
  try {
    const res = await send({
      html:    '<h2>Here is a new client, grats!</h2><h2>' + 
      hour + ":00  " + day + "." + month + "." + year + '</h2><h1>Client email: ' 
      + clientEmail + '</h1>',
      to:      email,
      subject: 'New client for Anastasia Zell'
    });
  } catch (e) {
    console.error('* [promise-example-2] ERROR:', e);
  }
};

router.get('/email', (req, res) => {
  let email = req.query.email;
  asyncAwaitSend(email);
  res.sendStatus(200);
});

router.get('/emailAboutNewClient', (req, res) => {
  const email = req.query.email;
  const clientEmail = req.query.client;
  const year = req.query.year;
  const month = req.query.month;
  const day = req.query.day;
  const hour = req.query.hour;
  asyncAwaitSendInfoAboutNewClient(email, clientEmail, year, month, day, hour);
  res.sendStatus(200);
});

router.get('/couldSeeCalendar', (req, res) => {
  let code = req.query.code;
  if (CODE.includes(code))
  {
    let index = CODE.indexOf(code);
    if (index !== -1)
    {
      CODE.splice(index, 1);
    }
    res.send(true);
  }
  else
    res.send(false);
});


router.route('/arts').get((req, res) => {
  let requestedPage = parseInt(req.query.page) + 1;
  if (!requestedPage)
    requestedPage = 1;
  let maxArtsOnPage = parseInt(req.query.maxArts);
  if (!maxArtsOnPage)
    maxArtsOnPage = 10;
  let searchLineVal = req.query.search;
  if (searchLineVal === undefined)
    searchLineVal = "";
  let categoryLineVal = req.query.category;
  if (categoryLineVal === undefined)
    categoryLineVal = "";
  let sortType = req.query.sort;
  if (sortType === undefined)
    sortType = 0;
  Promise.all([Art.getPaginatedArtsOnPage(requestedPage, maxArtsOnPage, searchLineVal, categoryLineVal, sortType), Art.getAllSearchedArts(searchLineVal, categoryLineVal)])
    .then(data => res.json({arts: data[0], artsCount: data[1].length}))
    .catch(() => res.sendStatus(204));
});

router.get('/artsMaxPage', (req, res) => {
  let requestedPage = parseInt(req.query.page);
  if (!requestedPage)
    requestedPage = 1;
  let maxArtsOnPage = 5;
  let searchLineVal = req.query.search;
  if (searchLineVal === undefined)
    searchLineVal = "";
  let categoryLineVal = req.query.category;
  if (categoryLineVal === undefined)
    categoryLineVal = "";
  Art.getMaxSearchedPage(maxArtsOnPage, searchLineVal, categoryLineVal)
    .then(page => res.json(page))
    .catch(() => res.sendStatus(204));
});

router.get('/arts/:id', (req, res) => {
  Art.getById(req.params.id)
    .then(art => res.json(art))
    .catch(() => res.sendStatus(404));
});

router.get('/allSearchedArts', (req, res) => {
  let requestedPage = parseInt(req.query.page);
  if (!requestedPage)
    requestedPage = 1;
  let searchLineVal = req.query.search;
  if (searchLineVal === undefined)
    searchLineVal = "";
  let categoryLineVal = req.query.category;
  if (categoryLineVal === undefined)
    categoryLineVal = "";
  Art.getAllSearchedArts(searchLineVal, categoryLineVal)
    .then(arts => res.json(arts))
    .catch(() => res.sendStatus(204));
});

router.post('/arts', checkAdmin, (req, res) => {
  if (req.body.name !== undefined)
  {
    let art = new Art;
    art.name = req.body.name;
    Category.getIdByName(req.body.category)
      .then(categoryId => {
        if (categoryId !== null)
        {
          art.category = req.body.category;
          art.price = req.body.price;
          art.imageUrl = "";
          if (req.body.imageUrl !== undefined)
            art.imageUrl = req.body.imageUrl;
          return Art.insert(art);
        }
        else
          res.sendStatus(400);
      })
      .then(New => res.status(201).json(New))
      .catch(() => res.status(400));
  }
  else
    res.status(400);
});

router.put('/arts/:id', checkAdmin, (req, res) => {
  let id = req.params.id;
  if (req.body.category !== undefined)
  {
    Category.getIdByName(req.body.category)
    .then(categoryId => {
      if (categoryId !== null)
        return Art.getById(id);
    })
    .then(art => {
      if (req.body.name !== undefined)
        art.name = req.body.name;
      art.category = req.body.category;
      if (req.body.price !== undefined)
        art.price = req.body.price;
      if (req.body.imageUrl !== undefined)
        art.imageUrl = req.body.imageUrl;
      return Art.update(art);
    })
    .then(updated => {
        res.json(updated);
    })
    .catch(() => res.sendStatus(400));
  }
  else
  {
    Art.getById(id)
    .then(art => {
      if (req.body.name !== undefined)
        art.name = req.body.name;
      if (req.body.price !== undefined)
        art.price = req.body.price;
      if (req.body.imageUrl !== undefined)
      {
        art.imageUrl = req.body.imageUrl;
      }
      return Art.update(art);
    })
    .then(updated => {
        res.json(updated);
    })
    .catch(() => res.sendStatus(400));
  }
});

router.delete('/arts/:id', checkAdmin, async (req, res) => {
  let art = await Art.getById(req.params.id);
  await Art.deleteById(art._id);
  res.json(art);
});



router.get('/categoriesAll', (req, res) => {
  Category.getAll()
    .then(categories => res.json(categories))
    .catch(() => res.sendStatus(204));
});

router.get('/categories', (req, res) => {
  let requestedPage = parseInt(req.query.page);
  if (!requestedPage)
    requestedPage = 1;
  let maxCategoriesOnPage = req.query.maxCategories; //2
  let searchLineVal = req.query.search;
  if (searchLineVal === undefined)
    searchLineVal = "";
  Category.getPaginatedCategoriesOnPage(requestedPage, maxCategoriesOnPage, searchLineVal)
    .then(categories => res.json(categories))
    .catch(() => res.sendStatus(204));
});

router.get('/categoryName/:name', checkAdmin, (req, res) => {
  Category.getIdByName(req.params.name)
    .then(id => res.json(id))
    .catch(() => res.sendStatus(204));
});

router.get('/categories/:id', (req, res) => {
  Category.getById(req.params.id)
    .then(user => res.json(user))
    .catch(() => res.sendStatus(404));
});

router.post('/categories', checkAdmin, (req, res) => {
  let category = new Category;
  category.name = req.body.name;
  Category.insert(category)
    .then(inserted => res.status(201).json(inserted))
    .catch(err => res.status(400).send(err));
});

router.put('/categories/:id', checkAdmin, (req, res) => {
  let id = req.params.id;
  Category.getById(id)
    .then(category => {
      category.name = req.body.name;
      if (req.body.name === undefined)
        return 400;
      return Category.update(category);
    })
    .then(updated => {
      if (updated === 400)
        res.sendStatus(400);
      else
        res.json(updated);
    })
    .catch(() => res.sendStatus(404));
});

router.delete('/categories/:id', checkAdmin, (req, res) => {
  Category.deleteById(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(() => res.sendStatus(404));
});

function checkAdmin(req, res, next) {
  if (req.body.password !== process.env.admin_password) return res.sendStatus(403);
  next();
}


module.exports = router;