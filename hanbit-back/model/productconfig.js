var db = require('../lib/db');
var multer = require('multer');
var path = require('path');
var gm = require('gm');

module.exports = (function(){
    
    var productconfig = {};
    
    productconfig.delProduct = (req,res,handler,errhandler) => {
        let id = req.body.id;
        
        let sql = "delete from product where id = ?";
        db.put(sql,[id],req,res,handler,errhandler);
    }
    
    productconfig.addProduct = (req,res,handler,errhandler) => {
        let tags = req.body.tags;
        let colors = req.body.colors;
        let views = 0;
        let note = req.body.note;
        
        
        console.log(typeof(tags));
        console.log(tags);
        //console.log(colors);
        //console.log(note);
        //console.log(req.files);
        let mainImg = req.files.mainImage[0];
        let sample1 = req.files.sample1Image[0];
        let sample2 = req.files.sample2Image[0];
        let sample3 = req.files.sample3Image[0];
        
        //console.log(mainImg);
        
        if(req.body.tags!=="" && req.body.colors!=="" && req.body.note!=="" && mainImg && sample1 && sample2 && sample3 ){
        
            let promises = new Array();
            let mainImage = imageResize(mainImg.destination,mainImg.filename,"",1000);
            let thumbnailImage = imageResize(mainImg.destination,mainImg.filename,"thumb",338);
            let sample1Image = imageResize(sample1.destination,sample1.filename,"",250);
            let sample2Image = imageResize(sample2.destination,sample2.filename,"",250);
            let sample3Image = imageResize(sample3.destination,sample3.filename,"",250);
            let sampleImages = [sample1.filename,sample2.filename,sample3.filename];
            sampleImages = sampleImages.join(",");
            
            promises.push(mainImage,1000);
            promises.push(thumbnailImage);
            promises.push(sample1Image,250);
            promises.push(sample2Image,250);
            promises.push(sample3Image,250);
        
            Promise.all(promises)
            .then(()=>{
                let sql = "insert into product(tags,colors,views,note,thumbnail,mainimage,sampleimage) values(?,?,?,?,?,?,?)";
                db.put(sql,[tags,colors,views,note,"thumb"+mainImg.filename,mainImg.filename,sampleImages],req,res,handler,errhandler);
            })
            .catch((err)=>{
                errhandler(res,err);
            });
        }else{
            errhandler(res.err);
        }
        
    }
    
    productconfig.Upload = multer({
                                storage: multer.diskStorage({
                                    destination: function (req, file, cb) {
                                        cb(null, 'public/uploads/');
                                    },
                                    filename: function (req, file, cb) {
                                        cb(null, new Date().valueOf() + path.extname(file.originalname));
                                    }
                                }),
                                });
    
    let imageResize = (filepath,filename,prefix,width) =>{
        return new Promise((resolve,reject)=>{
            gm(filepath+filename)
                .resize(width)
                .write(filepath+prefix+filename, function (err) {
                if (err){
                    console.log(err);
                    reject(new Error("[Upload] File Uploading.. "+err))
                }
                else{
                    resolve(0);
                }
                });
            
        },(err)=>{
            reject(new Error("[Upload] File Uploading.. "+err));
        });
    }
    
    
    return productconfig;
    
})();