var etcconfig = require("../model/etcconfig");
var productconfig = require("../model/productconfig");
var product = require("../model/product");
var constructconfig = require("../model/constructconfig");
var construct = require("../model/construct");
var sms = require('../lib/sms');


module.exports = (function () {

    let controller = {};

    /* *************************** */
    /* 사용자API - 제품정보가져오기*/
    /* *************************** */

    controller.getProduct = (req, res) => {
        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        product.getProduct(req, res, errhandler);
    }


    controller.getProducts = (req, res) => {

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        product.getProducts(req, res, errhandler);

    }

    controller.getConstruct = (req, res) => {
        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        construct.getConstruct(req, res, errhandler);
    }

    controller.getConstructs = (req, res) => {
        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        construct.getConstructs(req, res, errhandler);
    }

    controller.getLikeConstructs = (req, res) => {
        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        construct.getLikeConstructs(req, res, errhandler);
    }


    /* *************************** */
    /* 관리자페이지 - 제품소개관리 */
    /* *************************** */

    controller.addProduct = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        productconfig.addProduct(req, res, handler, errhandler);
    }

    controller.productUpload = productconfig.Upload;

    /* *************************** */
    /* 관리자페이지 - 제품삭제 */
    /* *************************** */

    controller.delProduct = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        productconfig.delProduct(req, res, handler, errhandler);
    }

    /* *************************** */
    /* 관리자페이지 - 시공모음관리 */
    /* *************************** */

    controller.addConstruct = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        constructconfig.addConstruct(req, res, handler, errhandler);

    }

    controller.constructmainUpload = constructconfig.mainUpload;

    controller.constructUpload = constructconfig.Upload;

    controller.constrcutImageResize = constructconfig.imageResize;

    /* *************************** */
    /* 관리자페이지 - 시공모음삭제 */
    /* *************************** */

    controller.delConstruct = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        constructconfig.delConstruct(req, res, handler, errhandler);
    }

    /* *********************** */
    /* 관리자페이지 - 기타관리 */
    /* *********************** */

    controller.addTag = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.addTag(req, res, handler, errhandler);
    }

    controller.delTag = (req, res) => {

        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.delTag(req, res, handler, errhandler);
    }

    controller.getTag = (req, res) => {

        let handler = (req, res, rows) => {
            res.json({ "result": rows });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.getTag(req, res, handler, errhandler);
    }

    controller.addColor = (req, res) => {
        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.addColor(req, res, handler, errhandler);
    }

    controller.delColor = (req, res) => {
        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.delColor(req, res, handler, errhandler);
    }

    controller.getColor = (req, res) => {
        let handler = (req, res, rows) => {
            res.json({ "result": rows });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.getColor(req, res, handler, errhandler);
    }

    controller.addSpace = (req, res) => {
        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }
        etcconfig.addSpace(req, res, handler, errhandler);
    }

    controller.delSpace = (req, res) => {
        let handler = (req, res) => {
            res.json({ "result": "Success" });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }
        etcconfig.delSpace(req, res, handler, errhandler);
    }

    controller.getSpace = (req, res) => {
        let handler = (req, res, rows) => {
            res.json({ "result": rows });
        }

        let errhandler = (res, err) => {
            res.json({ "result": err });
        }

        etcconfig.getSpace(req, res, handler, errhandler);
    }


    /* *********************** */
    /* API - SMS */
    /* *********************** */

    controller.pushSMS = (req, res) => {
        console.log(sms.from);
        sms.push([removeHyphen(req.body.phonenumber)], `[창세계] 납품 신청 문의가 접수되었습니다.`)
            .then((resp) => {
                console.log(resp);
                return sms.push(sms.storyPhoneList(),
                    `업체명:${req.body.companyname},대표명:${req.body.ceoname},지역:${req.body.area},연락처:${req.body.phonenumber},이메일:${req.body.email}`)
            })
            .then((resp) => {
                console.log(resp);
                res.json({ "result": "success" });
            })
            .catch((err) => {
                console.log(err);
                res.json({ "result": "fail" });
            })

        function removeHyphen(phonenumber) {
            return phonenumber.split('-').join('');
        }
    }

    return controller;

})();
