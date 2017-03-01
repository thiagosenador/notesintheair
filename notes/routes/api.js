var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')({
  projectId: 'notesintheair-160023',
  keyFilename: './private/notesintheair_key.json'
});


router.post('/create_note', function (req, res, next) {
  // Save data to Datastore. 
  var blogPostData = {
    title: 'How to make the perfect homemade pasta',
    author: 'Andrew Chilton',
    isDraft: true
  };

  var blogPostKey = datastore.key('BlogPost');

  datastore.save({
    key: blogPostKey,
    data: blogPostData
  }, function (err) {
    // `blogPostKey` has been updated with an ID so you can do more operations 
    // with it, such as an update. 
    blogPostData.isDraft = false;

    datastore.save({
      key: blogPostKey,
      data: blogPostData
    }, function (err) {
      if (!err) {
        // The blog post is now published! 
      }
    });
  });
  res.json({ message: 'thiago rocksssss!!!' })
});

module.exports = router;