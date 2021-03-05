var db = require('../lib/db');

module.exports = (function(){
    
    let construct = {};
    
    construct.getConstruct = (req,res,errhandler) => {
        let id = req.params.id;
        
        let sql = "select * from construct where id="+id;
        
        let handler = (req,res,rows) => {
            let result = rows;
            let obj = new Object();
            obj.id = result[0].id;
            obj.title = result[0].title;
            obj.imgurl = result[0].mainimage;
            obj.tags = result[0].tags.split(",");
            obj.contents = result[0].contents;
            obj.space = result[0].space;
            
            res.json({result:obj});
        }
        
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    construct.getConstructs = (req,res,errhandler) => {
        ///:space/:tag/:fire/:auto/:order
        let startindex = req.params.index;
        let endindex = parseInt(startindex) + 16;
        let space = encodeURIComponent(req.params.space); //전체보기있음
        let tag = encodeURIComponent(req.params.tag); //전체보기있음
        let fire = req.params.fire;
        let auto = req.params.auto;
        let order = req.params.order;
        
        if(req.params.space=="all"){
            space = "";
        }
        
        if(req.params.tag=="all"){
            tag = "";
        }
        
        if(fire=="true"){
            fire = encodeURIComponent("방염");
        }else{
            fire = "";
        }
        
        if(auto=="true"){
            auto = encodeURIComponent("전동제품");
        }else{
            auto = "";
        }
        
        let sql = "select c.id,c.title,c.contents,c.tags,c.space,c.views,c.date,c.mainimage,c.thumbnail,COUNT(cl.construct_id) as 'like' from construct as c left outer join construct_like as cl on c.id = cl.construct_id where c.tags like \"%"+tag+"%\" and c.tags like \"%"+fire+"%\" and c.tags like \"%"+auto+"%\" and c.space like \"%"+space+"%\" group by c.id order by '"+order+"' limit "+startindex+","+endindex;
        
        
        let handler = (req,res,rows) => {
            let result = rows;
            let arr = new Array();
            
            for(let i in result){
                let obj = new Object();
                obj.id = result[i].id;
                obj.imgurl = result[i].thumbnail;
                obj.title = result[i].title;
                obj.tags = result[i].tags.split(",");
                obj.space = result[i].space.split(",");
                obj.like = result[i].like;
                obj.views = result[i].views;
                let date = formatDate(result[i].date).toString().split("T");
                obj.date = date[0];
                arr.push(obj);
            }
            
            result = arr;
            let sql2 = "select count(id) as allcount from construct where tags like \"%"+tag+"%\" and tags like \"%"+fire+"%\" and tags like \"%"+auto+"%\" and space like \"%"+space+"%\"";
            
            
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

    
    return construct;
    
})();