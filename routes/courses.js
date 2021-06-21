var express = require('express');
var router = express.Router();
const Course = require("../models/course");
const passport = require('passport');


// Get all courses
router.get("/", passport.authenticate('jwt', { session : false}),async (req, res) => {
	const courses = await Course.find().populate("level")
	res.send(courses)
})

//Create Course
router.post("/", async (req, res) => {
	const course = new Course({
		name: req.body.name,
		description: req.body.description,
		level: req.body.level
	})
	await course.save()
	res.send(course)
})

//Get individual Course
router.get("/:id", passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {

	const course = await Course.findOne({ _id: req.params.id }).populate("level")
	res.send(course)
    }
    catch {
		res.status(404)
		res.send({ error: "Course doesn't exist!" })
	}
})

//Update individual Course
router.patch("/:id",passport.authenticate('jwt', { session : false}), async (req, res) => {
	try {
		const course = await Course.findOne({ _id: req.params.id })

		if (req.body.name) {
			course.name = req.body.name
		}

		if (req.body.description) {
		   course.description = req.body.description
		}

		if (req.body.level) {
			course.level = req.body.level
		 }

		await course.save()
		res.send(course)
	} catch {
		res.status(404)
		res.send({ error: "Course doesn't exist!" })
	}
})


//Delete individual Course
router.delete("/:id",passport.authenticate('jwt', { session : false}), async (req, res) => {
	try {
		await Course.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Course doesn't exist!" })
	}
})








module.exports = router;