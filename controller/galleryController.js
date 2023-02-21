var fs = require('graceful-fs');
var FileQueue = require('filequeue');
const cache = require('node-cache');
var fq = new FileQueue(100);
const userCache = new cache();

const Gallery = require("../model/gallery")

exports.insertData=(req,res,next)=>{
    const {path}=req.query;
    var obj;
    for (let index =0; index <5697; index++) {
        
        fq.readFile(`${path}.json`, function (err, data) {
            if (err) console.log(err);
            const {name,description,external_url,image,attributes}= JSON.parse(data);

            const flag=attributes.some(data=>data.trait_type==='BODY')
            if(flag){
                let BACKGROUND=attributes.find(data=>data.trait_type==='BACKGROUND')?.value;
                let HOOD=attributes.find(data=>data.trait_type==='HOOD')?.value;
                let NEONGLOW=attributes.find(data=>data.trait_type==='NEON GLOW')?.value;
                let DOOR=attributes.find(data=>data.trait_type==='DOOR')?.value;
                let COLOR=attributes.find(data=>data.trait_type==='COLOR')?.value;
                let RIMS=attributes.find(data=>data.trait_type==='RIMS')?.value;
                let REAREXHAUST=attributes.find(data=>data.trait_type==='REAR EXHAUST')?.value;
                let SIDEEXHAUST=attributes.find(data=>data.trait_type==='SIDE EXHAUST')?.value;
                let HEADLIGHTS=attributes.find(data=>data.trait_type==='HEADLIGHTS')?.value;
                let BUMPER=attributes.find(data=>data.trait_type==='BUMPER')?.value;
                let ROOF=attributes.find(data=>data.trait_type==='ROOF')?.value;
                let BODY=attributes.find(data=>data.trait_type==='BODY')?.value;
                let TOPSPEED=attributes.find(data=>data.trait_type==='TOP SPEED');
                let ACCELERATION=attributes.find(data=>data.trait_type==='ACCELERATION');
                let NITROUS=attributes.find(data=>data.trait_type==='NITROUS');
                let HANDLING=attributes.find(data=>data.trait_type==='HANDLING');
                let ARMOR=attributes.find(data=>data.trait_type==='ARMOR');
                // console.log(BACKGROUND,HOOD,NEONGLOW,DOOR,COLOR,RIMS,REAREXHAUST,SIDEEXHAUST
                //     ,HEADLIGHTS,BUMPER,ROOF,BODY,TOPSPEED,ACCELERATION,NITROUS,HANDLING,ARMOR)
                
                Gallery.create({
                    name:name,
                    description:description || '',
                    external_url:external_url || '',
                    image:image || '',
                    attributes:{
                       Background:BACKGROUND || '',
                       HOOD:HOOD || '',
                       NEONGLOW:NEONGLOW || '',
                       DOOR:DOOR || '',
                       COLOR:COLOR || '',
                       RIMS:RIMS || '',
                       REAREXHAUST:REAREXHAUST || '',
                       SIDEEXHAUST:SIDEEXHAUST || '',
                       HEADLIGHTS:HEADLIGHTS || '',
                       BUMPER:BUMPER || '',
                       ROOF: ROOF || '',
                       BODY: BODY || '',
                       TOPSPEED: TOPSPEED || '',
                       ACCELERATION:{
                        value:ACCELERATION.value || 0,
                        max_value:ACCELERATION.max_value || 0
                       },
                       NITROUS:{
                        value:NITROUS?.value || 0,
                        max_value:NITROUS?.max_value || 0
                       },
                       HANDLING:{
                        value:HANDLING?.value || 0,
                        max_value:HANDLING?.max_value || 0
                       },
                       ARMOR:{
                        value:ARMOR?.value || 0,
                        max_value:ARMOR?.max_value || 0
                       }
                    },

               })
               .then((response)=>{
                //    console.log(response)
               })  
               .catch((error)=>{
                   console.log(error)
               })                        
              
            }else{
                
                let Background=attributes.find(data=>data.trait_type==='Background')?.value;
                let Skin=attributes.find(data=>data.trait_type==='Skin')?.value;
                let Eyes=attributes.find(data=>data.trait_type==='Eyes')?.value;
                let Mouth=attributes.find(data=>data.trait_type==='Mouth')?.value;
                let Head=attributes.find(data=>data.trait_type==='Head')?.value;
                let Clothing=attributes.find(data=>data.trait_type==='Clothing')?.value;
                let Weapon=attributes.find(data=>data.trait_type==='Weapon')?.value;
                let Species=attributes.find(data=>data.trait_type==='Species')?.value;
                // console.log(Background,Skin)
                // let [Background,Skin,Eyes,Mouth,Head,Clothing,Weapon,Species]=attributes;
                 Gallery.create({
                     name:name,
                     description:description || '',
                     external_url:external_url || '',
                     image:image || '',
                     attributes:{
                        Background:Background || '',
                        Skin:Skin || '',
                        Eyes:Eyes || '',
                        Mouth:Mouth || '',
                        Head:Head || '',
                        Clothing:Clothing || '',
                        Weapon:Weapon || '',
                        Species:Species || ''
                     },

                })
                .then((response)=>{
                    console.log(response)
                })  
                .catch((error)=>{
                    console.log(error)
                })                        
            }

            });        
    }

}

exports.getCars=(req,res,next)=>{
    const {limit=20,page=1}=req.query;
    Gallery
    .find({
        'attributes.HOOD':{$exists:true}
    })
    // .limit(limit)
    // .skip(offset)
    .then(function(response) {
        res.status(200).json({cars:response.splice(0,(limit*page)),length:response.length,flag:true,msg:'Succefully get Cars'})
    })
    .catch((error)=>{
        res.status(501).json({error:error})

    })
}


exports.getAvatars=(req,res,next)=>{
    const {limit=20,page=1}=req.query;
    Gallery
    .find({
        'attributes.HOOD':{$exists:false}
    })
    // .limit(limit)
    // .skip(offset)
    .then(async function(response) {
        const length=await response?.length;  
        res.status(200).json({avatars:response.splice(0,(limit*page)),length:length,flag:true,msg:'Succefully get Avatars'})
    })
    .catch((error)=>{
        res.status(501).json({error:error})

    })
}

exports.getPost=(req,res,next)=>{
    const {id}=req.params;
    Gallery
    .findOne({_id:id})
    .select('-attributes.TOPSPEED -attributes.ACCELERATION -attributes.NITROUS -attributes.HANDLING -attributes.ARMOR')

    .then((post)=>{
        res.json({post:post})
    })
    
    .catch((error)=>{
        res.status(501).json({error:error})
    })
} 


exports.getFilterAvatars=async(req,res,next)=>{
    let Back=await Gallery.find().distinct('attributes.Background')
    
    let Background=await Gallery.find().distinct('attributes.Background');
    Background=await Background.filter(item=>item!=="");

    let Skin=await Gallery.find().distinct('attributes.Skin');
    Skin=await Skin.filter(item=>item!=="");
    
    let Eyes=await Gallery.find().distinct('attributes.Eyes');
    Eyes=await Eyes.filter(item=>item!=="");
    
    let  Mouth=await Gallery.find().distinct('attributes.Mouth');
    Mouth=await Mouth.filter(item=>item!=="");
    
    let Head=await Gallery.find().distinct('attributes.Head');
    Head=await Head.filter(item=>item!=="")

    let Clothing=await Gallery.find().distinct('attributes.Clothing');
    Clothing=await Clothing.filter(item=>item!=="")
    
    let Weapon=await Gallery.find().distinct('attributes.Weapon');
    Weapon=await Weapon.filter(item=>item!=="");

    let Species=await Gallery.find().distinct('attributes.Species');
    Species=await  Species.filter(item=>item!=="");
    res.json({Background:Background,Skin:Skin,Eyes:Eyes,Mouth:Mouth,Head:Head,Clothing:Clothing,Weapon:Weapon,Species:Species})
}


exports.searchFilterAvatars=async (req,res,next)=>{
    const {background,skin,eyes,mouth,head,clothing,weapon,species,key}=req.query;
    console.log(key)
    if(key==='Background'){
        let Background=await Gallery.distinct('attributes.Background',{"attributes.Background":{$regex: '.*' + background+ '.*',$options: "i"}});
        Background=await Background.filter(item=>item!=="");

        res.status(200).json({Background:Background});
        return ;

    }
    if(key==='Skin'){
        let Skin=await Gallery.distinct('attributes.Skin',{"attributes.Skin":{$regex: '.*' + skin + '.*',$options:'i'}});
        Skin=await Skin.filter(item=>item!=="");

        res.status(200).json({Skin:Skin,flag:true});
        return ;

    }
    if(key==='Eyes'){
        let Eyes=await Gallery.distinct('attributes.Eyes',{"attributes.Eyes":{$regex: '.*' + eyes + '.*',$options:'i'}});
        Eyes=await Eyes.filter(item=>item!=="");

        res.status(200).json({Eyes:Eyes,flag:true});
        return ;

    }

    if(key==='Mouth'){
        let  Mouth=await Gallery.distinct('attributes.Mouth',{'attributes.Mouth': {$regex: '.*' + mouth + '.*',$options:'i'}});
        Mouth=await Mouth.filter(item=>item!=="");
        
        res.status(200).json({Mouth:Mouth,flag:true});
        return ;

    }

    if(key==='Head'){
        let Head=await Gallery.distinct('attributes.Head',{"attributes.Head":{$regex: '.*' + head + '.*',$options:'i'}});
        Head=await Head.filter(item=>item!=="");

        res.status(200).json({Head:Head,flag:true});
        return ;
    }

    if(key==='Clothing'){
        let Clothing=await Gallery.distinct('attributes.Clothing',{"attributes.Clothing":{$regex: '.*' + clothing+ '.*',$options:'i'}});
        Clothing=await Clothing.filter(item=>item!=="");
        
        res.status(200).json({Clothing:Clothing,flag:true});
        return ;

    }

    if(key==='Weapon'){
        let Weapon=await Gallery.distinct('attributes.Weapon',{"attributes.Weapon":{$regex: '.*' + weapon + '.*',$options:'i'}});
        Weapon=await Weapon.filter(item=>item!=="");

        res.status(200).json({Weapon:Weapon,flag:true});
        return ;
    }

    if(key==='Species'){
        let Species=await Gallery.distinct('attributes.Species',{"attributes.Species":{$regex: '.*' + species+ '.*',$options:'i'}});
        Species=await Species.filter(item=>item!=="");

        res.status(200).json({Species:Species,flag:true});
        return ;
    }
}



exports.getFilterCars=async(req,res,next)=>{
    let Background=await Gallery.find().distinct('attributes.Background');
        Background=await Background.filter(item=>item!=="");

    let HOOD=await Gallery.find().distinct('attributes.HOOD');
        HOOD=await HOOD.filter(item=>item!=="");

    let NEONGLOW=await Gallery.find().distinct('attributes.NEONGLOW');
        NEONGLOW=await NEONGLOW.filter(item=>item!=="");
    
    let DOOR=await Gallery.find().distinct('attributes.DOOR')
        DOOR=await DOOR.filter(item=>item!=="");

    let COLOR=await Gallery.find().distinct('attributes.COLOR');
        COLOR=await COLOR.filter(item=>item!=="");

    let RIMS=await Gallery.find().distinct('attributes.RIMS');
        RIMS=await RIMS.filter(item=>item!=="");

    let REAREXHAUST=await Gallery.find().distinct('attributes.REAREXHAUST');
        REAREXHAUST=await REAREXHAUST.filter(item=>item!=="");

    let SIDEEXHAUST=await Gallery.find().distinct('attributes.SIDEEXHAUST');
        SIDEEXHAUST=await SIDEEXHAUST.filter(item=>item!=="");

    let HEADLIGHTS=await Gallery.find().distinct('attributes.HEADLIGHTS');
        HEADLIGHTS=await HEADLIGHTS.filter(item=>item!=="");

    let BUMPER=await Gallery.find().distinct('attributes.BUMPER');
        BUMPER=await BUMPER.filter(item=>item!=="");

    let ROOF=await Gallery.find().distinct('attributes.ROOF');
        ROOF=await ROOF.filter(item=>item!=="");

    let BODY=await Gallery.find().distinct('attributes.BODY');
        BODY=await BODY.filter(item=>item!=="");

    res.json({Background:Background,HOOD:HOOD,NEONGLOW:NEONGLOW,DOOR:DOOR,COLOR:COLOR,RIMS:RIMS,REAREXHAUST:REAREXHAUST,SIDEEXHAUST:SIDEEXHAUST,HEADLIGHTS:HEADLIGHTS,BUMPER:BUMPER,ROOF:ROOF,BODY:BODY })
}

exports.searchFilterCars=async (req,res,next)=>{

    const {background,hood,neonglow,door,color,rims,rearexhaust,sideexhaust,headlights,bumper,roof,body}=req.query;
    if(background?.length>0){
        let Background=await Gallery.distinct('attributes.Background',{"attributes.Background":{$regex: '.*' + background+ '.*',$options: "i"}});
        res.status(200).json({Background:Background});
        return ;
    }
    if(hood?.length>0){
        let HOOD=await Gallery.distinct('attributes.HOOD',{'attributes.HOOD':{$regex: '.*' + hood + '.*',$options: "i"}});
        res.status(200).json({HOOD:HOOD});
        return ;

    }
    if(neonglow?.length>0){
        let NEONGLOW=await Gallery.distinct('attributes.NEONGLOW',{'attributes.NEONGLOW':{$regex: '.*' + neonglow + '.*',$options:"i"}});
        res.status(200).json({NEONGLOW:NEONGLOW});
        return ;
    }
    if(door?.length>0){
        let DOOR=await Gallery.distinct('attributes.DOOR',{'attributes.DOOR':{$regex: '.*' + door + '.*',$options:'i'}});
        res.status(200).json({DOOR:DOOR});
        return ;
    }
    if(color?.length>0){
        let COLOR=await Gallery.distinct('attributes.COLOR',{'attributes.COLOR':{$regex: '.*' + color + '.*',$options:'i'}});
        res.status(200).json({COLOR:COLOR });
        return ;

    }
    if(rims?.length>0){
        let RIMS=await Gallery.distinct('attributes.RIMS',{'attributes.RIMS':{$regex: '.*' + rims + '.*',$options:'i'}});
        res.status(200).json({RIMS:RIMS});
        return ;

    }

    if(rearexhaust?.length>0){
        let REAREXHAUST=await Gallery.distinct('attributes.REAREXHAUST',{'attributes.REAREXHAUST':{$regex: '.*' + rearexhaust + '.*',$options:'i'}});
        res.status(200).json({REAREXHAUST:REAREXHAUST });
        return ;

    }
    if(sideexhaust?.length>0){
        let SIDEEXHAUST=await Gallery.distinct('attributes.SIDEEXHAUST',{'attributes.SIDEEXHAUST':{$regex: '.*' + sideexhaust + '.*',$options:'i'}});
        res.status(200).json({SIDEEXHAUST:SIDEEXHAUST });
        return ;

    }
    if(headlights?.length>0){
        let HEADLIGHTS=await Gallery.distinct('attributes.HEADLIGHTS',{'attributes.HEADLIGHTS':{$regex: '.*' + headlights + '.*',$options:'i'}});
        res.status(200).json({HEADLIGHTS:HEADLIGHTS});
        return ;

    }
    if(bumper?.length>0){
        let BUMPER=await Gallery.distinct('attributes.BUMPER',{'attributes.BUMPER':{$regex: '.*' + bumper + '.*',$options:'i'}});
        res.status(200).json({BUMPER:BUMPER});
        return ;
    }
    if(roof?.length>0){
        let ROOF=await Gallery.distinct('attributes.ROOF',{'attributes.ROOF':{$regex: '.*' + roof + '.*',$options:'i'}});
        res.status(200).json({ROOF:ROOF});
        return ;
    }
    if(body?.length>0){
        let BODY=await Gallery.distinct('attributes.BODY',{'attributes.BODY':{$regex: '.*' + body + '.*',$options:'i'}});
        res.status(200).json({BODY:BODY});
        return ;
    }

    res.json({msg:'kindly select the params'})
}

// exports.getCars


exports.nameSearchCars=(req,res,next)=>{
    const {limit=20,page=1,search}=req.query;
    if(search.length>=1){
         const cars=Gallery.find({name:{$regex:search,$options: "i"},'attributes.HOOD':{$exists:true}})
        // .limit(200)
        .then(async(cars)=>{
            // console.log(cars.length)
             const length=await cars.length;
             await res.status(200).json({msg:'Successfully Fetched Cars',cars:cars.splice(0,limit),length:length,flag:true});
        })
        .catch((error)=>{
            res.status(400).json({err:error,flag:false});
        })
    }
}

exports.nameSearchAvatars=async (req,res,next)=>{
    const {limit=20,page=1,search}=req.query;

    const cacheKey = `avatars-${search}`;
    let avatars = userCache.get(cacheKey);

    if(search.length>=1 || !avatars){    
        const avatars=await Gallery.find({name:{$regex: '.*' + search+ '.*',$options: "i"},'attributes.HOOD':{$exists:false}}).exec().catch((error)=>{res.status(400).json({err:error,flag:false})})
        const length=await avatars.length
        await res.status(200).json({msg:'Successfully Fetched Avatars',avatars:avatars.splice(0,limit),length:length,flag:true});
        return userCache.set(cacheKey, avatars);

   }
   res.status(200).json({msg:'Successfully Fetched Avatars',avatars:avatars.splice(0,limit),length:avatars.length,flag:true});

}


exports.searchFilterPostCars=async(req,res,next)=>{

    const {Background=[],HOOD=[],NEONGLOW= [],DOOR=[],COLOR=[],RIMS=[],
           REAREXHAUST=[],SIDEEXHAUST=[],HEADLIGHTS=[],BUMPER=[],ROOF=[],BODY=[]}=req.body;
    const {limit=20,page=1}=req.query;
    
   Gallery
    .find({
        $and:[
            {
                $or:[
                    {'attributes.Background':{"$in":Background}},
                    {'attributes.HOOD':{"$in":HOOD}},
                    {'attributes.NEONGLOW':{"$in":NEONGLOW}},
                    {'attributes.DOOR':{"$in":DOOR}},
                    {'attributes.COLOR':{"$in":COLOR}},
                    {'attributes.RIMS':{"$in":RIMS}},
                    {'attributes.REAREXHAUST':{"$in":REAREXHAUST}},
                    {'attributes.SIDEEXHAUST':{"$in":SIDEEXHAUST}},
                    {'attributes.HEADLIGHTS':{"$in":HEADLIGHTS}},
                    {'attributes.BUMPER':{"$in":BUMPER}},
                    {'attributes.ROOF':{"$in":ROOF}},
                    {'attributes.BODY':{"$in":BODY}}
                ]
            },
            {'attributes.HOOD':{"$exists":true}}
    ]})
    .then(async (cars)=>{
        const length=await cars.length;
        res.status(200).json({msg:'Successfully Fetched Cars',cars:cars,length,flag:true});
    })
    .catch((error)=>{
        res.status(400).json({err:error,flag:false});
    })
}


exports.searchFilterPostAvatar=(req,res,next)=>{
    console.log('hit-avata',req.body)
    const {Background,Skin=[],Eyes=[],Mouth=[],Head=[],Clothing=[],Weapon=[],Species=[]}=req.body;
    const {limit=20,page=0}=req.query;
     // Background,Skin,Eyes,Mouth,Head,Clothing,Weapon,Species
     console.log(Background,Skin,Eyes,Mouth,Head,Clothing,Weapon,Species)
    Gallery
    .find({
        $and:[
            {
                $or:[
                    {'attributes.Background':{"$in":Background}},
                    {'attributes.Skin':{"$in":Skin}},
                    {'attributes.Eyes':{"$in":Eyes}},
                    {'attributes.Mouth':{"$in":Mouth}},
                    {'attributes.Head':{"$in":Head}},
                    {'attributes.Clothing':{"$in":Clothing}},
                    {'attributes.Weapon':{"$in":Weapon}},
                    {'attributes.Species':{"$in":Species}}                
                ],

            },
            // {'attributes.HOOD':{"$exists":false}}

        ]})
        .then(async (avatars)=>{
            const length=await avatars.length;
            console.log(avatars)
           return res.status(200).json({msg:'Successfully Fetched Avatars',avatars:avatars.splice(0,limit),length:length,flag:true});
        })
    .catch((error)=>{
        res.status(400).json({err:error,flag:false});
    })
}


