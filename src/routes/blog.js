const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

//GET(READ DATA)

router.get('/blog', async (req, res) => {
    try {

        let limitSize = Number(req.query.page);
        if (req.query.page) {
            limitSize = Number(req.query.page) * 5;
        }

        const data = await Blog.find({
            topic: req.query.search
        }).limit(limitSize);
        res.json({
            status: "success",
            result: data
        })
    } catch (e) {
        res.json({
            status: "Failed",
            Message: e.message
        })
    }
})

//POST(CREATE DATA)

router.post('/blog', async (req, res) => {
    try {
        // console.log(req.body);
        const data = await Blog.create(req.body);
        res.json({
            status: "success",
            result: data
        })
    } catch (e) {
        res.json({
            status: "Failed",
            Message: e.message
        })
    }
})

//PUT(UPDATE DATA)

router.put('/blog/:id', async (req, res) => {
    try {
        await Blog.updateOne({ _id: req.params.id }, req.body)

        const blog = await Blog.findOne({
            _id: req.params.id
        });

        res.json({
            status: "success",
            result: blog
        })
    } catch (e) {
        res.json({
            status: "Failed",
            Message: e.message
        })
    }
})

//DELETE(DELETE DATA)

router.delete('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.deleteOne({
            _id: req.params.id
        });

        res.json({
            status: "success",
            result: blog
        })
    } catch (e) {
        res.json({
            status: "Failed",
            Message: e.message
        })
    }
})

module.exports = router;