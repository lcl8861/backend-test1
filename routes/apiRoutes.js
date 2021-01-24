const express = require('express');
const app = express();
const router = express.Router();
const commonServices = require('../common/commonServices');
const bodyParser = require('body-parser');

router.get('/getTopPosts',async function(req, res) {
    let result = await commonServices.getComments();
    let comments = JSON.parse(result);
    let groupedComments = {};

    //group all comments by postId
    comments.map(comment=>{
        if(comment.postId){
            if (!groupedComments[comment.postId]) {
                groupedComments[comment.postId] = 0;
            }
            groupedComments[comment.postId] += 1;
        }
    });

    //sort postId by highest comment in descending order
    let sortedComments = [];
    for (let postId in groupedComments) {
        sortedComments.push([postId, groupedComments[postId]]);
    }

    sortedComments.sort(function(a, b) {
        return b[1] -  a[1];
    });

    //get all post for later
    result = await commonServices.getPost();
    let allPosts = JSON.parse(result);
    let topPosts = [];

    for (let post of sortedComments) {
        let foundPost;
        foundPost = allPosts.find(item => item.id ==  post[0]);

        if (post) {
            topPosts.push({
                post_id: post[0],
                post_title: foundPost.title,
                post_body: foundPost.body,
                total_number_of_comments: post[1]
            });
        }
    }

    return res.json({data: topPosts, size: topPosts.length});
});

router.get('/searchComment', async function(req, res) {
    let searchQuery = req.query.q;
    let allComments = await commonServices.getComments();
    let comments = JSON.parse(allComments);
    let filteredComments =[];

    if (!comments || !comments.length) {
        return res.json('Failed to retrieve comments from source');
    }

    comments.map(
        comment=>{
            for(let field in comment){
                if(comment[field].toString().search('.*' + searchQuery + '.*') >= 0) {
                    filteredComments.push(comment);
                    break;
                }
            }
        }
    )

    return res.json({data: filteredComments, size:filteredComments.length});
});
module.exports = router;