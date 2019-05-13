const express = require('express');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const mysql_setting = {
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  port : 3306,
  database: 'test'
}
//localhost:3000/
router.get('/', function (req, res, next) {
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  const page = req.query.page;
  connection.query('SELECT isbn13,bookname,coverimg FROM booklog ORDER BY getdate DESC', function (error, results, fields) {
    if (error) throw error;
    res.render('index', { content: results, page: page });
  });
  connection.end();
});
//localhost:3000/add
router.get('/add', function (req, res, next) {
  res.render('add');
});
//localhost:3000/addへのPOST
router.post('/add', (req, res, next) => {
  const errors = validationResult(req);
  const isbn13      = req.body.isbn13;
  const isbn10      = req.body.isbn10;
  const bookname    = req.body.bookname;
  const author      = req.body.author;
  const publisher   = req.body.publisher;
  const genre       = req.body.genre;
  const ownership   = req.body.ownership;
  var   purchase    = null;
  if (req.body.purchase !== "") {
    purchase = req.body.purchase;
  }
  const library     = req.body.library;
  const overview    = req.body.overview;
  const impressions = req.body.impressions;
  const state       = req.body.state;
  const coverimg    = req.body.coverimg;
  var getdate       = null;
  if (req.body.getdate !== "") {
    getdate   = req.body.getdate;
  }
  var issuedate     = null;
  if (req.body.issuedate !== "") {
    issuedate = req.body.issuedate;
  }
  var readdate      = null;
  if (req.body.readdate !== "") {
    readdate  = req.body.readdate;
  }
  const post = { 'isbn13'     : isbn13,
                 'isbn10'     : isbn10,
                 'bookname'   : bookname,
                 'author'     : author,
                 'publisher'  : publisher,
                 'genre'      : genre,
                 'ownership'  : ownership,
                 'purchase'   : purchase,
                 'library'    : library,
                 'overview'   : overview,
                 'impressions': impressions,
                 'state'      : state,
                 'coverimg'   : coverimg,
                 'getdate'    : getdate,
                 'issuedate'  : issuedate,
                 'readdate'   : readdate };
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('INSERT INTO booklog SET ?', post, function (error, results, fields) {
    if (error) throw error;
    res.redirect('./');
    console.log('ISBN13:', results.insertIsbn13);
  });
  connection.end();
})
 
//localhost:3000/delete
router.post('/delete', (req, res, next) => {
  const isbn13 = req.body.isbn13;
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('DELETE FROM booklog WHERE isbn13=?', isbn13, function (error, results, fields) {
    if (error) throw error;
    res.redirect('./');
  });
  connection.end();
})
//localhost:3000/edit
router.get('/edit', function (req, res, next) {
  const isbn13 = req.query.isbn13;
  const page   = req.query.page;
  const strSql = "SELECT DATE_FORMAT(getdate,'%Y/%m/%d') getdate,"
                 + "DATE_FORMAT(issuedate,'%Y/%m/%d') issuedate,"
                 + "DATE_FORMAT(readdate,'%Y/%m/%d') readdate,"
                 + "isbn10,bookname,author,publisher,genre,ownership,"
                 + "purchase,library,overview,impressions,state,coverimg"
                 + " FROM booklog WHERE isbn13=?"
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query(strSql, isbn13, function (error, results, fields) {
    if (error) throw error;
    if (!results.length) {
      res.redirect('../');
    } else {
      const data = {
        isbn13:      isbn13,
        page:        page,
        isbn10:      results[0].isbn10,
        bookname:    results[0].bookname,
        author:      results[0].author,
        publisher:   results[0].publisher,
        genre:       results[0].genre,
        ownership:   results[0].ownership,
        purchase:    results[0].purchase,
        library:     results[0].library,
        overview:    results[0].overview,
        impressions: results[0].impressions,
        state:       results[0].state,
        coverimg:    results[0].coverimg,
        getdate:     results[0].getdate,
        issuedate:   results[0].issuedate,
        readdate:    results[0].readdate
      };
      res.render('edit', data );
    }
  });
  connection.end();
});
//localhost:3000/editへPOST
router.post('/edit', (req, res, next) => {
  const errors = validationResult(req);
  const isbn13      = req.body.isbn13;
  var   page        = 0;
  if (req.body.page !== "") {
    page            = req.body.page;
  }
  const isbn10      = req.body.isbn10;
  const bookname    = req.body.bookname;
  const author      = req.body.author;
  const publisher   = req.body.publisher;
  const genre       = req.body.genre;
  const ownership   = req.body.ownership;
  var   purchase    = null;
  if (req.body.purchase !== "") {
    purchase    = req.body.purchase;
  }
  const library     = req.body.library;
  const overview    = req.body.overview;
  const impressions = req.body.impressions;
  const state       = req.body.state;
  const coverimg    = req.body.coverimg;
  var   getdate     = null;
  if (req.body.getdate !== "") {
    getdate   = req.body.getdate;
  }
  var   issuedate   = null;
  if (req.body.issuedate !== "") {
    issuedate = req.body.issuedate;
  }
  var   readdate    = null;
  if (req.body.readdate !== "") {
    readdate  = req.body.readdate;
  }
  const post = { 'isbn10'     : isbn10,
                 'bookname'   : bookname,
                 'author'     : author,
                 'publisher'  : publisher,
                 'genre'      : genre,
                 'ownership'  : ownership,
                 'purchase'   : purchase,
                 'library'    : library,
                 'overview'   : overview,
                 'impressions': impressions,
                 'state'      : state,
                 'coverimg'   : coverimg,
                 'getdate'    : getdate,
                 'issuedate'  : issuedate,
                 'readdate'   : readdate };
  const connection = mysql.createConnection(mysql_setting);
  connection.connect();
  connection.query('UPDATE booklog SET ? WHERE isbn13 = ?', [post, isbn13], function (error, results, fields) {
    if (error) throw error;
      if (req.body.page > 0) {
        res.redirect('../?page=' + req.body.page)
      } else {
        res.redirect('../')
      }
  });
  connection.end();
});
module.exports = router;
