var db = require('../lib/db');

module.exports = (function(){
    
    let product = {};
    
    product.getProduct = (req,res,errhandler) => {
        let id = req.params.id;
        
        let sql = "select * from product where id="+id;
        
        let handler = (req,res,rows) => {
            let result = rows;
            let obj = new Object();
            obj.id = result[0].id;
            obj.imgurl = result[0].mainimage;
            obj.tags = result[0].tags.split(",");
            obj.colors = result[0].colors.split(",");
            obj.note = result[0].note.split(",");
            obj.sample = result[0].sampleimage.split(",");
            
            res.json({result:obj});
        }
        
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    
    product.getProducts = (req,res,errhandler) => {
        let startindex = req.params.index;
        let endindex = parseInt(startindex) + 16;
        let tag = encodeURIComponent(req.params.tag);
        let order = req.params.order;
        
        let sql = "select p.id,p.tags,p.colors,p.views,p.note,p.thumbnail,p.mainimage,p.sampleimage,p.date,COUNT(pl.product_id) as 'like' from product as p left outer join product_like as pl on p.id = pl.product_id where p.tags like \"%"+tag+"%\" group by p.id order by '"+order+"' limit "+startindex+","+endindex;
        
        if(req.params.tag=="all"){
            sql = "select p.id,p.tags,p.colors,p.views,p.note,p.thumbnail,p.mainimage,p.sampleimage,p.date,COUNT(pl.product_id) as 'like' from product as p left outer join product_like as pl on p.id = pl.product_id group by p.id order by '"+order+"' limit "+startindex+","+endindex;
        }
        
        
        let handler = (req,res,rows) => {
            let result = rows;
            let arr = new Array();
            
            for(let i in result){
                let obj = new Object();
                obj.id = result[i].id;
                obj.imgurl = result[i].thumbnail;
		obj.mainImgurl = result[i].mainimage;
                obj.tags = result[i].tags.split(",");
                obj.colors = result[i].colors.split(",");
                obj.like = result[i].like;
                obj.views = result[i].views;
                let date = formatDate(result[i].date).toString().split("T");
                obj.date = date[0];
                arr.push(obj);
            }
            
            result = arr;
            let sql2 = "select count(id) as allcount from product where tags like \"%"+tag+"%\"";
            
            if(req.params.tag=="all"){
                sql2 = "select count(id) as allcount from product";
            }
            
            
            let handler2 = (req,res,rows) => {
                let allcount = rows[0].allcount;
                let remain = allcount > parseInt(startindex)+result.length;  
                res.json({"result":result,"allcount":allcount,"remain":remain});
            }
            
            db.zero_get(sql2,req,res,handler2,errhandler);
        }
        
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    function formatDate(date) { 
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear(); 
        if (month.length < 2) month = '0' + month; 
        if (day.length < 2) day = '0' + day; return [year, month, day].join('-'); 
        
    }

    
    return product;
    
})();
