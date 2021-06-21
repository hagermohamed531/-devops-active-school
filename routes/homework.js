var express = require('express');
var router = express.Router();
const HomeWork = require("../models/homework");
const HomeworkAnswers = require("../models/homework_answer");
const passport = require('passport');
// Get all homeworks
router.get("/",passport.authenticate('jwt', { session : false}), async (req, res) => {
	const homeworks = await HomeWork.find().populate("course")
	res.send(homeworks)
})

//Create HomeWork
router.post("/", async (req, res) => {
	const homework = new HomeWork({
		name: req.body.name,
		course: req.body.course,
	})
	await homework.save()
	res.send(homework)
})

//Get individual HomeWork
router.get("/:id",passport.authenticate('jwt', { session : false}), async (req, res) => {
    try {

	const homework = await HomeWork.findOne({ _id: req.params.id }).populate("course")
	res.send(homework)
    }
    catch {
		res.status(404)
		res.send({ error: "HomeWork doesn't exist!" })
	}
})

//Update individual HomeWork
router.patch("/:id", passport.authenticate('jwt', { session : false}),async (req, res) => {
	try {
		const homework = await HomeWork.findOne({ _id: req.params.id })

		if (req.body.name) {
			homework.name = req.body.name
		}

		if (req.body.course) {
		   homework.course = req.body.course
		}

		await homework.save()
		res.send(homework)
	} catch {
		res.status(404)
		res.send({ error: "HomeWork doesn't exist!" })
	}
})


//Delete individual HomeWork
router.delete("/:id",passport.authenticate('jwt', { session : false}), async (req, res) => {
	try {
		await HomeWork.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "HomeWork doesn't exist!" })
	}
})

//Get Answers of one homework
router.get("/:id/answers", passport.authenticate('jwt', { session : false}),async (req, res) => {
    try {

	const homework_answers = await HomeworkAnswers.find({ homework: req.params.id }).populate("student").populate("homework")
	res.send(homework_answers)
    }
    catch {
		res.status(404)
		res.send({ error: "HomeWork doesn't exist!" })
	}
})

//create homework answer
router.post("/:id/answers",passport.authenticate('jwt', { session : false}), async (req, res) => {
    const homework_answer = new HomeWork({
      answer: req.body.answer,
      homework: req.params.id,
	  //student: auth(id)
    })
    await homework_answer.save()
    res.send(homework_answer)
  })





module.exports = router;