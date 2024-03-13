const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const articles = require("../data/articles.js");
const dbuser = require("./dbuser.js");
const saltRounds = 10;

class Panier {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.articles = [];
  }
}

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("test", dbuser.user, dbuser.password, {
  dialect: "mysql",
  host: "localhost",
});

try {
  sequelize.authenticate();
  console.log("Connected to the data base !");
} catch (error) {
  console.error("Unable to connect, next error :", error);
}

/**
 * In this file you'll find examples of GET, POST, PUT and DELETE requests.
* These requests concern the addition or deletion of items on the site.
* Your objective is, by learning from the examples in this file, to create the API for the user's shopping cart.

 */

/**
 * Our mechanism for saving users' baskets will be to simply assign them a basket using req.session, without any special authentication.
 */
router.use((req, res, next) => {
  // user is not recognized, assign a basket in req.session
  if (typeof req.session.panier === "undefined") {
    req.session.panier = new Panier();
  }
  next();
});

/*
 * This route must return the user's shopping cart, thanks to req.session
 */
router.get("/panier", (req, res) => {
  //send basket to user
  res.status(200).json(req.session.panier);
  return;
});

/*
 * This route adds an item to the shopping cart, then returns the modified cart to the user.
 * The body must contain the item id, as well as the desired quantity.
 */
router.post("/panier", (req, res) => {
  var panier = req.session.panier.articles;
  const id = parseInt(req.body.id);
  const quantite = parseInt(req.body.quantite);

  //quantity validity
  if (!Number.isInteger(quantite) || isNaN(quantite) || quantite < 1) {
    //send failure message to user
    res
      .status(400)
      .json({ message: "The quantity must be a strictly positive integer" });
    return;
  }

  //check the existence of the article on the site
  const article = articles.find((a) => a.id === id);
  if (!article) {
    //send failure message to user
    res.status(404).json({ message: "the article " + id + " does not exist" });
    return;
  }

  //check existence of item in basket
  const articleExistant = panier.find(
    (articlePanier) => articlePanier.article.id === id
  );
  if (articleExistant) {
    //send failure message to user
    res.status(400).json({ message: "the article " + id + " Already exist" });
    return;
  }

  //create a basket item object
  const articlePanier = { article: article, quantite: quantite };

  //add the itemCart instance to the shopping cart
  panier.push(articlePanier);

  //send the added item to the user
  res.status(201).json(articlePanier);
  return;
});

/*
 * This route is used to confirm a shopping cart, by receiving the user's first and last name.
 * The basket is then deleted using req.session.destroy()
 */
router.post("/panier/pay", (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;

  //input control for first and last name
  if (
    typeof nom !== "string" ||
    nom === "" ||
    typeof prenom !== "string" ||
    prenom === ""
  ) {
    //send failure message to user
    res
      .status(400)
      .json({ message: "Invalid format or content of first or last name" });
    return;
  }

  //empty the basket
  req.session.destroy();

  //send success message to user
  res
    .status(200)
    .json({ message: "Merci " + prenom + " " + nom + " " + "For your buy" });
  return;
});

/*
 * This route is used to change the quantity of an item in the shopping cart.
 * The body must contain the desired quantity
 */
router.put("/panier/:articleId", (req, res) => {
  var panier = req.session.panier.articles;
  const id = parseInt(req.params.articleId);
  const quantite = parseInt(req.body.quantite);

  //quantity validity
  if (!Number.isInteger(quantite) || isNaN(quantite) || quantite < 1) {
    //send failure message to user
    res
      .status(400)
      .json({ message: "The quantity must be a strictly positive integer " });
    return;
  }

  //modify item quantity
  panier.find(function (articlePanier) {
    if (articlePanier.article.id === id) {
      //input quantity is the same as the basket quantity
      if (articlePanier.quantite == quantite) {
        //send message(202 accepted) to user
        res.status(202).json({
          message: "The input quantity is the same as the basket quantity",
        });
        return;
      }
      articlePanier.quantite = quantite;

      //send success message to user
      res.status(200).json({ panier });
      return;
    }
  });

  //send failure message to user
  res.status(404).json({ message: "Article " + id + " does not exist " });
  return;
});

/*
 * This route deletes an item from the basket
 */
router.delete("/panier/:articleId", (req, res) => {
  var panier = req.session.panier.articles;
  const id = parseInt(req.params.articleId);
  const index = panier.findIndex(
    (articlePanier) => articlePanier.article.id === id
  );
  //index = -1 if condition not satisfied

  //index validity
  if (index == -1) {
    //send failure message to user
    res.status(404).json({ message: "article " + id + " does not exist " });
    return;
  }

  //remove item from basket
  panier.splice(index, 1);

  //send success message to user
  res.status(200).json({ message: "Succeed in deleting the article " + id });
  return;
});

/**
 * This route sends all the articles on the site
 */
router.get("/articles", (req, res) => {
  try {
    //retrieve all items in the database
    sequelize.query("SELECT * FROM articles").then(([results, metadata]) => {
      //envoyer les articles
      res.status(200).json(results);
      return;
    });
  } catch (error) {
    //send failure message to user
    res.status(400).json({ error: "Impossible of getting all articles" });
    return;
  }
});

/**
 * This route creates an article.
 * WARNING: in a real site, it should be authenticated and validate that the user is authorized.
 * NOTE: when the server is restarted, the added article disappears.
 * If we wanted to persist the information, we'd use a DB (mysql, etc.).
 */
router.post("/article", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const price = parseInt(req.body.price);

  // checking the validity of input data
  if (
    typeof name !== "string" ||
    name === "" ||
    typeof description !== "string" ||
    description === "" ||
    typeof image !== "string" ||
    image === "" ||
    isNaN(price) ||
    price <= 0
  ) {
    res.status(400).json({ message: "bad request" });
    return;
  }

  try {
    //insert an article in the database
    sequelize
      .query(
        "INSERT INTO articles (name, description, price, image) value ( '" +
          name +
          "','" +
          description +
          "','" +
          price +
          "','" +
          image +
          "');"
      )
      .then(([result, metadata]) => {
        const id = result; //article id
        console.log(result); //display the added article on the console
        res.status(200).json({
          //send article on front-end
          id_article: id,
          name: name,
          description: description,
          image: image,
          price: price,
        });
        return;
      });
  } catch (error) {
    //send failure message to user
    res.status(400).json({ error: "Impossible to retrieve all items" });
    return;
  }
});

/**
 *This function validates that the item requested by the user
 * is valid. It is applied to routes:
 * GET /article/:articleId
 * PUT /article/:articleId
 * DELETE /article/:articleId
 * As these three routes have a similar behavior, their common functionalities are grouped together in a middleware package
 */
function parseArticle(req, res, next) {
  const articleId = parseInt(req.params.articleId);

  // if articleId is not a number (NaN = Not A Number), then we stop
  if (isNaN(articleId)) {
    res.status(400).json({ message: "articleId should be a number" });
    return;
  }
  // we assign req.articleId to use it in all routes that need it
  req.articleId = articleId;

  const article = articles.find((a) => a.id === req.articleId);
  if (!article) {
    res
      .status(404)
      .json({ message: "article " + articleId + " does not exist" });
    return;
  }
  // req.article is assigned for use on all routes that require it
  req.article = article;
  next();
}

router
  .route("/article/:articleId")
  /**
   * This route sends a special item
   */
  .get(parseArticle, (req, res) => {
    // req.article exists thanks to the parseArticle middleware
    res.status(200).json(req.article);
    return;
  })

  /**
   * This route modifies an article.
   * WARNING: in a real site, it should be authenticated and validate that the user is authorized.
   * NOTE: when the server is restarted, the article modification disappears.
   * If we wanted to persist the information, we'd use a DB (mysql, etc.).
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const price = parseInt(req.body.price);

    req.article.name = name;
    req.article.description = description;
    req.article.image = image;
    req.article.price = price;
    res.send();
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex((a) => a.id === req.articleId);
    articles.splice(index, 1); // remove the article from the array
    res.send();
  });

/**
 * This route allows users to connect
 */
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    await sequelize
      .query("SELECT * FROM user WHERE email = :email", {
        replacements: { email: email },
      })
      .then(([result, metadata]) => {
        if (result.length == 0) {
          //verify user existence
          console.log("False : user does not exist");
          res.status(404).json({ message: "False : user does not exist" });
          return;
        }
        const user = result[0]; //get user
        if (user.actif == 0) {
          //active user
          console.log("User is not active");
          res.status(401).json({ message: "User is not active" });
          return;
        }
        if (user.password != password) {
          //verify password
          console.log("User password is not correct.");
          res.status(401).json({ message: "User password is not correct." });
          return;
        }
        req.session.userId = user.id_user; //user login in session

        res.status(201).json({
          id_user: user.id_user,
          email: user.email,
        });
        return;
      });
  } catch (error) {
    res.status(400).json({ error: "login failed" });
    return;
  }
});

/**
 * This route is used to check the user's connection status
 */
router.get("/connexion", (req, res) => {
  //if the user is not logged in
  if (typeof req.session.userId === "undefined") {
    console.log("user is not connected");
    return;
  }

  try {
    sequelize
      .query(
        //retrieve user's email address
        "SELECT * FROM users WHERE id_user = :id_user",
        {
          replacements: { id_user: req.session.userId },
        }
      )
      .then(([result, metadata]) => {
        if (result.length == 0) {
          //verify user existence
          console.log("Fasle :user does not exist");
          res.status(404).json({ message: "Fasle : user does not exist" });
          return;
        }
        const user = result[0]; //get user
        res.status(200).json({
          //send user information to front-end
          id_user: user.id_user,
          email: user.email,
        });
        return;
      });
  } catch (error) {
    //send failure message to user
    res.status(400).json({ error: "Unable to find user" });
    return;
  }
});

/**
 * This route allows the user to disconnect
 */
router.get("/deconnexion", (req, res) => {
  //if the user is not logged in
  if (typeof req.session.userId != "undefined") {
    //free session to disconnect
    req.session.destroy();

    //send success message to user
    res.status(200).json({ message: "deconneted" });
    return;
  }
  //send error message to user
  res.status(400).json({ message: "User not logged in" });
  return;
});

module.exports = router;
