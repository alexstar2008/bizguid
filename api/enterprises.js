const api = (app,repo)=>{

    let repository = repo;
    app.get("/enterprises",(req,res,next)=>{
        const offset = +req.query.offset;
        const amount  = +req.query.amount;
        repository.getAllCompanies(offset,amount).then((data)=>{
            res.status(200).send(data);
        });
    });
    app.get("/enterprises/:slug",(req,res,next)=>{
        const slug = req.params.slug;
        repository.getCompanyInfo(slug).then((data)=>{
            res.status(200).send(data);
        });
    });

    app.get("/",(req,res,next)=>{
        res.status(200).json({data:"All is ok"});
    });

};

module.exports = api;