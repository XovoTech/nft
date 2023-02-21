const express=require('express')
const router=express.Router();
const GalleryController=require('./controller/galleryController')
const ScrollController=require('./controller/scrollController')
// For Insert the data
router.post('/insert-data',GalleryController.insertData)
// Get Avatars Route
router.get('/get-avatars',GalleryController.getAvatars)
// Get Filters List and category name
router.get('/get-FilterAvatars',GalleryController.getFilterAvatars);
// Search Filters send the only accept one background,skin,eyes,mouth,head,clothing,weapon,species call the api and search any category
router.post('/search-FilterAvatars',GalleryController.searchFilterAvatars)

// Get Cars Post
router.get('/get-cars',GalleryController.getCars)
// Get Filter list Cars related
router.get('/get-FilterCars',GalleryController.getFilterCars);
// Get Filter list Cars related
router.post('/search-FilterCars',GalleryController.searchFilterCars);

// Get the post detail
router.get('/post/:id',GalleryController.getPost);

// Search the Avatars and name
router.post('/search-avatars',GalleryController.nameSearchAvatars);
// Search the cars and name

router.post('/search-cars',GalleryController.nameSearchCars);

// select multiple category search cars
router.post('/searchFilter-cars',GalleryController.searchFilterPostCars);
// select multiple  category clothing etc
router.post('/searchFilter-avatars',GalleryController.searchFilterPostAvatar);


router.post('/get-data',ScrollController.endpointController)

module.exports=router;