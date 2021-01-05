const Posts = require('../models/posts');
const apiResponse = require("../helpers/apiResponse");
const url = require('url');
const querystring = require('querystring');
function PostData(data) {
	this.id = data._id;
	this.publishedDate= data.publishedDate;
	this.author = data.author;
	this.title = data.title;
	this.isPublished = data.isPublished;
	this.timestamp = data.timestamp;
}
exports.lists = [(req, res)=>{
    try {
        let rawUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        let parsedUrl = url.parse(rawUrl);
        let parsedQs = querystring.parse(parsedUrl.query);
        if(parsedQs.isPublished !== "true" && parsedQs.isPublished !== 'false') {
            delete parsedQs.isPublished
        }
        if(parsedQs.isPublished) {
            parsedQs = {...parsedQs , isPublished: parsedQs.isPublished === "true" ? true : false}
        }
        let where = Object.keys(parsedQs).length > 0 ? { where: parsedQs } : ''
        var data =  where ? Posts.findAll(where) :  Posts.findAll()
        // return apiResponse.successResponseWithData(res, "Operation success", data, 200);
        data.then((result)=>{
            if(result.length > 0){
                return apiResponse.successResponseWithData(res, "Operation success", result, 200);
            }else{
                return apiResponse.successResponseWithData(res, "Operation success", [], 200);
            }
        });
    } catch (err) {
        //throw error in json response with status 500. 
        return apiResponse.ErrorResponse(res, err);
    }
}]
exports.list = [(req, res)=>{
    try {
        var id = parseInt(req.params.id);
        Posts.findAll({where: { id: id } }).then((result)=>{
            if(result.length > 0){
                return apiResponse.successResponseWithData(res, "Operation success", result[0], 200);
            }else{
                return apiResponse.notFoundResponse(res, "Operation success", 'ID not found', 404);
            }
        });
    } catch (err) {
        //throw error in json response with status 500. 
        return apiResponse.ErrorResponse(res, err);
    }
}]
exports.addPost  = [
    (req, res)=>{
    try {
        const date = new Date().getTime()
        const pubdate = req.body.isPublished ? { publishedDate: date } : {}
        const data = {...req.body,...pubdate}
        // return apiResponse.successResponseWithData(res, "Operation success", data, 201);
        Posts.create(data).then((result) => {
                return apiResponse.successResponseWithData(res, "Operation success", result, 201);
        })
       
    } catch (err) {
        //throw error in json response with status 500. 
        return apiResponse.ErrorResponse(res, err);
    }
}]
exports.restricted  = [
    (req, res)=>{
    try {
        return apiResponse.successResponseWithData(res, "Operation success", "", 405);
       
    } catch (err) {
        //throw error in json response with status 500. 
        return apiResponse.ErrorResponse(res, err);
    }
}]