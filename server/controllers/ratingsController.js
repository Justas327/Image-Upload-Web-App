const HttpStatus = require('http-status-codes');

const ratingsService = require('../services/ratingsService');

module.exports.getAllRatings = async (req, res) => {
    const allRatings = await ratingsService.getAllRatings();
    res.send(allRatings);
}

module.exports.getImageRatings = async (req, res) => {
    const imageId = req.params.imageId;

    const foundRatings = await ratingsService.getImageRating(imageId);
    if(!foundRatings) {
        return res.status(HttpStatus.NOT_FOUND).send({error: 'Image not found'});
    }

    res.send({rating: foundRatings});
}

module.exports.updateRating = async (req, res) => {
    const {imageId, id} = req.params;
    const updatedRatingData = req.body;

    const updatedRating = await ratingsService.updateRating(imageId, id, updatedRatingData);
    if (!updatedRating) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid rating data'});
    }

    res.send(updatedRating);
}

module.exports.deleteRating = async (req, res) => {
    const {imageId, id} = req.params;

    const deleteRating = await ratingsService.deleteRating(imageId, id);
    if(!deleteRating) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid request data'});
    }

    res.send(deleteRating);
}

module.exports.createRating = async (req, res) => {
    const userId = req.user._id;
    const {imageId, rating} = req.body;

    const createdRating = await ratingsService.createRating(imageId, userId, rating);
    if(!createdRating) {
        return res.status(HttpStatus.BAD_REQUEST).send({error: 'Invalid rating data'});
    }

    res.send(createdRating);
}