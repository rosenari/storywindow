var db = require('../lib/db');
var multer = require('multer');
var gm = require('gm');
var path = require('path');

module.exports = (function () {

    let constructconfig = {};

    constructconfig.delConstruct = (req, res, handler, errhandler) => {
        let id = req.body.id;

        let sql = "delete from construct where id = ?";
        db.put(sql, [id], req, res, handler, errhandler);
    }

    constructconfig.addConstruct = (req, res, handler, errhandler) => {
        let title = req.body.subject;
        let contents = req.body.ir1;
        let tags = req.body.tags //array
        let space = req.body.space //
        let mainImg = req.files.mainImage[0];

        /*
        if(typeof(tags)=='object'){
            let temp = tags;
            tags = new Array();
            for(i in temp){
                tags.push(temp[i]);
            }
            tags = tags.toString();
        }
        
        if(typeof(space)=='object'){
            let temp = space;
            space = new Array();
            for(i in temp){
                space.push(temp[i]);
            }
            space = space.toString();
        }
        */

        if (title !== "" && contents !== "" && tags !== "" && space !== "" && mainImg) {

            let mainImage = imageResize2(mainImg.destination, mainImg.filename, "", 1000);
            let thumbnailImage = imageResize2(mainImg.destination, mainImg.filename, "thumb", 375);
            let promises = new Array();

            promises.push(mainImage, 1000);
            promises.push(thumbnailImage);

            Promise.all(promises)
                .then(() => {
                    let sql = "insert into construct(title,contents,tags,space,views,mainimage,thumbnail) values(?,?,?,?,?,?,?)";
                    db.put(sql, [title, contents, tags, space, 0, mainImg.filename, "thumb" + mainImg.filename], req, res, handler, errhandler);
                })
                .catch((err) => {
                    errhandler(res, err);
                });
        } else {
            res.json({ "result": "Fail" });
        }
    }

    constructconfig.mainUpload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, new Date().valueOf() + "construct" + path.extname(file.originalname));
            }
        }),
    });

    constructconfig.Upload = multer({
        storage: multer.diskStorage({
            destination: 'public/c_images',
            filename: function (req, file, cb) {
                cb(null, new Date().valueOf() + "_" + file.originalname);
            }
        }),
        onError: function (err, next) {
            console.log('error', err);
            next(err);
        }
    });

    constructconfig.imageResize = (filepath, filename) => {
        return new Promise((resolve, reject) => {

            gm(filepath + filename)
                .size(function (err, size) {
                    if (err) {
                        reject(new Error("[Upload] File Uploading.. " + err));
                    } else {
                        if (size.width < 800) {
                            resolve(1);
                        } else {
                            resolve(0);
                        }
                    }
                });

        }, (err) => {
            console.log(err);
            return err;
        }).then((result) => {
            if (result == 1) {
                gm(filepath + filename)
                    .resize(800)
                    .write(filepath + filename, function (err) {
                        if (err) {
                            console.log(err);
                            return err;
                        } else {

                        }
                    });
            }
        }).catch((err) => {
            console.log(err);
            return err;
        });
    }

    let imageResize2 = (filepath, filename, prefix, width) => {
        return new Promise((resolve, reject) => {
            gm(filepath + filename)
                .resize(width)
                .write(filepath + prefix + filename, function (err) {
                    if (err) {
                        console.log(err);
                        reject(new Error("[Upload] File Uploading.. " + err))
                    }
                    else {
                        resolve(0);
                    }
                });

        }, (err) => {
            console.log(err);
            return err;
        });
    }


    return constructconfig;


})();