const mongoose =require('mongoose');
const { Schema } = mongoose;

const GalleryShema = new Schema({
    name: {
        type: String,
        required:true,
        // allowNull: false
      },
      external_url: {
        type: String,
        required:true,
        // allowNull: false
      },
      description:{
       type:String,
       required:true,

    //    allowNull:false
      },
      image: {
        type:String,
        required:true,
      },
      attributes:{
        Background:{
          type:String,
        },
        Skin:{
          type:String,
        },
        Eyes:{
          type:String
        },
        Mouth:{
          type:String
        },
        Head:{
          type:String
        },
        Clothing:{
          type:String
        },
        Species:{
          type:String
        },
        Weapon:{
          type:String
        },
        HOOD:{
          type:String
        },
        NEONGLOW:{
          type:String,
        },
        DOOR:{
        type:String
        },
        COLOR:{
          type:String
        },
        RIMS:{
          type:String
        },
        REAREXHAUST:{
          type:String
        },
        HEADLIGHTS:{
          type:String
        },
        BUMPER:{
          type:String
        },
        ROOF:{
          type:String
        },
        BODY:{
          type:String
        },
        TOPSPEED:{
          type:{
            value:Number,
            max_value:Number
          }
        },
        ACCELERATION:{
          type:{value:Number,max_value:Number}
        },
        NITROUS:{
          type:{
            value:Number,max_value:Number
          }
        },
        HANDLING:{
          type:{
            value:Number,max_value:Number
          }
        },
        ARMOR:{
          type:{
            value:Number,max_value:Number
          }
        },
        "SIDE EXHAUST":{
          type:String
        }
      }
});

const Gallery = mongoose.model('Gallery', GalleryShema);

// const Gallery = sequelize.define("gallery", {
//    Background:
//     {
//      type: DataTypes.STRING,
//     },
//     Eyes:
//     {
//      type: DataTypes.STRING,
//     },
//     Mouth:
//     {
//         type: DataTypes.STRING,
//     },
//     Head:
//     {
//         type: DataTypes.STRING,
//     },
//     Fur:
//     {
//         type: DataTypes.STRING,
//     },
//     Clothing:
//     {
//         type: DataTypes.STRING,
//     },
//     Weapon:
//     {
//         type: DataTypes.STRING,
//     },
//     Species:
//     {
//         type: DataTypes.STRING,
//     }
  
// });

module.exports=Gallery;