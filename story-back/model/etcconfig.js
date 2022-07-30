var db = require('../lib/db');

module.exports = (function(){
    
    var etcconfig = {};
    
    etcconfig.addTag = (req,res,handler,errhandler) => {
        let sql = "insert into tags(tagid,tagname) values(?,?)";
        db.put(sql,[req.body.tagid,req.body.tagname],req,res,handler,errhandler);
    };
    
    etcconfig.delTag = (req,res,handler,errhandler) => {
        let sql = "delete from tags where tagid = ?"
        db.put(sql,[req.body.tagid],req,res,handler,errhandler);
    };
    
    etcconfig.getTag = (req,res,handler,errhandler) =>{
        let sql = "select * from tags"
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    etcconfig.addColor = (req,res,handler,errhandler) => {
        let sql = "insert into colorlist(colorvalue,colorname) values(?,?)";
        db.put(sql,[req.body.colorvalue,req.body.colorname],req,res,handler,errhandler);
    };
    
    etcconfig.delColor = (req,res,handler,errhandler) => {
        let sql = "delete from colorlist where colorvalue = ?"
        db.put(sql,[req.body.colorvalue],req,res,handler,errhandler);
    };
    
    etcconfig.getColor = (req,res,handler,errhandler) => {
        let sql = "select * from colorlist";
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    etcconfig.addSpace = (req,res,handler,errhandler) => {
        let sql = "insert into space(spaceid,spacename) values(?,?)"
        db.put(sql,[req.body.spaceid,req.body.spacename],req,res,handler,errhandler);
    }
    
    etcconfig.delSpace = (req,res,handler,errhandler) => {
        let sql = "delete from space where spaceid = ?"
        db.put(sql,[req.body.spaceid],req,res,handler,errhandler);
    }
    
    etcconfig.getSpace = (req,res,handler,errhandler) => {
        let sql = "select * from space";
        db.zero_get(sql,req,res,handler,errhandler);
    }
    
    return etcconfig;
    
})();
