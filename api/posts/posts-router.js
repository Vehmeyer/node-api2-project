// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    // console.log("GET request connected")
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', (req, res) => {
    // console.log("GET by ID connected")
    Posts.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.post('/', (req, res) => {
    // console.log("POST connected")
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        const { title, contents } = req.body
        Posts.insert({ title, contents })
            .then(posts => {
                res.status(201).json(posts)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: "There was an error while saving the post to the database"
            })
        })
    }
})

router.put('/:id', (req, res) => {
    // console.log("PUT connected")

    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        // const { title, contents } = req.body
        const changes = req.body
        Posts.update(req.params.id, changes)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
    }
})

router.delete('/:id', (req, res) => {
    // console.log("DELETE connected")
})



module.exports = router