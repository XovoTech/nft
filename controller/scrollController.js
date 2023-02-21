const GalleryController=require('./galleryController');
exports.endpointController=async (req,res,next)=>{

    console.log(req.body)
    const {searchApi,user}=req.body
    const {limit=20,page=1}=req.query;
    console.log(searchApi)
    if(searchApi==='/get-avatars'){
        Gallery
        .find({
            'attributes.HOOD':{$exists:false}
        })
        .then(async function(response) {  
            const length=await response.length
            res.status(200).json({avatars:response.splice(0,(limit*page)),length:length,flag:true,msg:'Succefully get Avatars'})
        })
        .catch((error)=>{
            res.status(501).json({error:error})
        })
    }
    // else if(req.body'/searchFilter-avatar'){
    //     const {Background,Skin=[],Eyes=[],Mouth=[],Head=[],Clothing=[],Weapon=[],Species=[]}=req.body;
    //     const {limit=20,page=0}=req.query;
    //      // Background,Skin,Eyes,Mouth,Head,Clothing,Weapon,Species
    //      console.log(Background,Skin,Eyes,Mouth,Head,Clothing,Weapon,Species)
    //     Gallery
    //     .find({
    //         $and:[
    //             {
    //                 $or:[
    //                     {'attributes.Background':{"$in":Background}},
    //                     {'attributes.Skin':{"$in":Skin}},
    //                     {'attributes.Eyes':{"$in":Eyes}},
    //                     {'attributes.Mouth':{"$in":Mouth}},
    //                     {'attributes.Head':{"$in":Head}},
    //                     {'attributes.Clothing':{"$in":Clothing}},
    //                     {'attributes.Weapon':{"$in":Weapon}},
    //                     {'attributes.Species':{"$in":Species}}                
    //                 ],
    
    //             },
    //             // {'attributes.HOOD':{"$exists":false}}
    
    //         ]})
    //         .then(async (avatars)=>{
    //             const length=await avatars.length;
    //             console.log(avatars)
    //            return res.status(200).json({msg:'Successfully Fetched Avatars',avatars:avatars.splice(0,limit),length:length,flag:true});
    //         })
    //     .catch((error)=>{
    //         res.status(400).json({err:error,flag:false});
    //     })
    // }
}