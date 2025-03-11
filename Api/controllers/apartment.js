const Apartment = require("../models/apartment")
const publisher = require("../models/publisher")
const city = require("../models/city")
const kategory = require("../models/kategory")

module.exports = {
    getAll: (req, res) => {
        Apartment.find().populate({path:'kodKategory',select:'-_id nameKategory'}).find().populate({path:'kodPublisher',select:'-_id phone secondPhone email'})
        // .find().populate({Path:'kodCity',select:'-_id nameCity'})
      
        // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
            .then((apartmens) => {
                res.status(200).send({ apartmens })
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
    // שליפה לפי קוד 
    getById: (req, res) => {
        Apartment.findById({  _id: req.params.id }).populate( {path:'kodPublisher',select:'-_id phone secondPhone email'}).findById({  _id: req.params.id }).populate({Path:'kodCity',select:'-_id nameCity'}).findById({  _id: req.params.id }).populate({path:'kodKategory',select:'-_id nameKategory'})
            // בהצלחה נקבל את האובייקט הרצוי
            .then((apartment) => {

                console.log(apartment.kodCity._id)
                //את זה לבדוק בחיבור 
                const weather= city.getWeather({kodCity}) 
                res.status(200).send({ apartment },{weather})
            })
            .catch((err) => {
                res.status(404).send({ message: `apartment not found!` })
            })
    },
 //  שליפה לפי קוד ומספר ימים 
 getByIdAndnumDays: (req, res) => {
    Apartment.getByIdAndnumDays({ _id: req.params.id,_numDays:req.params.numDays})
        // בהצלחה נקבל את האובייקט הרצוי
        .then((apartment) => {
            res.status(200).send({ apartment })
        })
        .catch((err) => {
            res.status(404).send({ message: `apartment not found!` })
        })},

    // מחיקה לפי קוד
    removeApartment: (req, res) => {
      
        
        // console.log(req.body)
        // if( req.params.kodPublisher==req.body.kodPublisher)
      
        // {
        publisher.findById({ _id: req.params.kodPublisher})
.then(()=>{
        console.log(req.params.id);
     Apartment.findById(req.params.id)
     .then((x)=>{    

        if(req.params.kodPublisher==x.kodPublisher){
        console.log(x);
     x.deleteOne()  
     
      .then(()=>{
        res.status(200).send('succed delete!!!!!!')
      })
      .catch((e)=>{
        res.status(500).send({error:e})

      })}
      else{
    return    res.status(404).send('isnt your Apartment!!!!!!')

      }
     })
     .catch((e)=>{
        res.status(500).send({error:e})
     })
      // .then((category) => {
            //     res.status(200).send({ message: `delete category ${category._id} succeed!` })
            // })
            // .catch((err) => {
            //     res.status(404).send({ error: err.message })
            // })
        })
        .catch((err)=>{          
            res.status(404).send({ error: err.message })

}) },
// else{
//     res.status(404).send("isn't your Apartment")
// 
// }
//   },
//     // עדכון לפי קוד
//     update: (req, res) => {
//         const _id = req.params.id

//         Category.findByIdAndUpdate(_id, req.body, { new: true })
//             .then((category) => {
//                 res.status(200).send({ message: `update category ${category._id} succeed!` })
//             })
//             .catch((err) => {
//                 res.status(404).send({ error: err.message })
//             })
//     }

// createApartment: (req, res) => {
//     console.log(req.body);
// publisher.findById({ _id: req.params.kodPublisher})
// .then(()=>{
//   console.log(req.file);
//     //req.file מתוך ה path שליפת המאפיין
//     //image שינוי שם המשתנה ל 
//     const { path: picture } = req.file
// const {porchSquareMeter,realEstateAgency,porch,squareMeter,numBuild,neighbourhood,street,nameApartment,describe,adress,numRooms,extras,price,kodKategory,kodCity,kodPublisher}=req.body
//     // const image = req.file.path
// // kategory.findById(kodKategory)
//     //     .then((category) => {
//     //         if (!category) {
//     //             return res.status(404).send({ message: `Category not found!` })
//     //         }

//     debugger
//     // const { path: picture } = req.file
//  console.log(req.file.filename);
//             const apartment = new Apartment({realEstateAgency,porchSquareMeter,porch,squareMeter,numBuild,neighbourhood,street,nameApartment,describe,adress,numRooms,extras,price,kodKategory,kodCity,kodPublisher
//               ,  picture:req.file.filename,}
//                 )
                
//                 console.log(apartment.kodKategory)
//                    //  res.status(200).send({ message: `succsess` })
//                 console.log('create');
//             apartment.save()
//            .then((a)=>{
//             console.log(a)
//             //add to publisher apartments
//             publisher.findByIdAndUpdate(req.body.kodPublisher, { $push: { apartment: a._id } }, { new: true })  
//             .then(() => {
//                 res.status(200).send({ message: `create article ${a._id} succeed!` })
//             })
//             .catch((err) => {
//                 res.status(500).send({ error: err.message })
//             })     
//             //add to city apartments   
//                 // city.findByIdAndUpdate(req.body.kodCity, { $push: { Apartment: a._id } }, { new: true })  
    
//                 // .then(() => {
//                 //     res.status(200).send({ message: `create article ${a._id} succeed!` })
//                 // })
//                 // .catch((err) => {
//                 //     res.status(500).send({ error: err.message })
//                 // }) 
//             //add to kategory apartments
//                 kategory.findByIdAndUpdate(req.body.kodKategory, { $push: { Apartment: a._id } }, { new: true })      
//                 .then(() => {
//                     res.status(200).send({ message: `create article ${a._id} succeed!` })
//                 })
//                 .catch((err) => {
//                     res.status(500).send({ error: err.message })
//                 })        })
//         .catch((err) => {
//             res.status(500).send({ error: err.message })
//         })

              
//              })
//             .catch((err)=>{          
//                      return res.status(404).send({ error: err.message })
            
//             }) }, 
       
createApartment: async (req, res) => {
    try {
        console.log(req.body);
        const publisherData = await publisher.findById({ _id: req.params.kodPublisher });
        
    
        if (!publisherData) {
            return res.status(404).send({ message: "Publisher not found!" });
        }

        // console.log(req.file);

        // בדיקת קובץ
        // if (!req.file) {
        //     return res.status(400).send({ message: "No file uploaded" });
        // }
        
        // const { path: picture } = req.file;
        const {floor,phone,secondPhone,email,datend, porchSquareMeter,city, realEstateAgency, porch, squareMeter, numBuild, neighbourhood, street, nameApartment, describe, adress, numRooms, extras, price, kodKategory, kodCity, kodPublisher } = req.body;

        const apartment = new Apartment({
            phone,secondPhone,email, floor, datend,  city,  realEstateAgency, porchSquareMeter, porch, squareMeter, numBuild, neighbourhood, street,
            nameApartment, describe, adress, numRooms, extras, price, kodKategory, kodCity, kodPublisher,
            // picture: req.file.filename
        });

        console.log('Apartment being created...');
        const createdApartment = await apartment.save();
        
        console.log(`Apartment created with ID: ${createdApartment._id}`);

        // עדכון ל-Publisher
        await publisher.findByIdAndUpdate(req.body.kodPublisher, { $push: { apartment: createdApartment._id } }, { new: true });
        
        // עדכון ל-Category
        await kategory.findByIdAndUpdate(req.body.kodKategory, { $push: { Apartment: createdApartment._id } }, { new: true });

        // אפשר להוסיף כאן גם את העדכון לעיר אם יש צורך

        return res.status(200).send({ message: `Apartment ${createdApartment._id} created successfully!` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: err.message });
    }
},
update: (req, res) => {
    console.log(req.params);
    console.log(req.body);

    // בדיקה אם קוד המפרסם מתאים
    if (req.params.kodPublisher === req.body.kodPublisher) {

        // חיפוש דירה לפי ID
        Apartment.findById(req.body._id)
            .then((apartment) => {
                if (!apartment) {
                    return res.status(404).send({ error: "Apartment not found" });
                }

                // יצירת אובייקט עדכון עם הערכים החדשים מה-body
                const updateData = { ...req.body };

                // העתקת ערכים מהדירה הקיימת אם צריך (למשל kodCity)
                updateData.kodCity = apartment.kodCity;
                // אם ברצונך לעדכן את התמונה או כל ערך אחר, עדכן כאן

                // ביצוע עדכון הדירה
                Apartment.findByIdAndUpdate(req.body._id, updateData, { new: true })
                    .then((updatedApartment) => {
                        res.status(200).send({
                            message: `Update Apartment ${updatedApartment._id} succeeded!`,
                            apartment: updatedApartment
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({ error: err.message });
                    });
            })
            .catch((err) => {
                res.status(404).send({ error: err.message });
            });

    } else {
        res.status(403).send("This is not your Apartment");
    }
}

//         update: (req, res) => {
//             console.log(req.params)
//             console.log(req.body);
//             if( req.params.kodPublisher==req.body.kodPublisher)
//            {
//             publisher.findById({ _id: req.params.kodPublisher})
            
//             .then(()=>{
//             // שליפת הקוד מהניתוב
//             const apartment = Apartment.findById({  _id: req.body._id })
//             console.log(req.body)
//             // בהצלחה נקבל את האובייקט הרצוי
//           const newApartment=new Apartment(req.body)
//                 newApartment.kodCity=apartment.kodCity
//                 // newApartment.kodPublisher=apartment.kodPublisher
//                 newApartment._id=req.body._id
// // newApartment.picture=apartment.picture
//             // חיפוש האובייקט המסוים ועדכון כל הערכים שנשלחו בגוף הבקשה
//             // מקבל שלשה ארגומנטים
//             // 1. קוד
//             // 2. הערכים לעדכון
//             // 3. אובייקט אפשרויות - האם להחזיר את האובייקט המעודכן או לפני שינוי
//             Apartment.findByIdAndUpdate(req.body._id, newApartment, { new: true })
//                 .then(() => {
//                     res.status(200).send({ message: `update Apartment ${apartment._id} succeed!`, apartment })
//                 })
//                 .catch((err) => {
//                     res.status(404).send({ error: err.message })
//                 })
//             })
//             .catch((err)=>{          
//                         res.status(404).send({ error: err.message })
            
//             })    }
//              else{
//                 res.status(404).send( "isn't your Apartment" )
   
//             }
//         }
           ,
        // שליפה לפי קוד 
    getByPublisherId: (req, res) => {
        Apartment.findById({  kodPublisher: req.params.kodPublisher }).populate( {path:'kodPublisher',select:'-_id phone secondPhone email'}&{Path:'kodCity',select:'-_id nameCity'}&{path:'kodKategory',select:'-_id nameKategory'})
            // בהצלחה נקבל את האובייקט הרצוי
            .then((apartment) => {
                res.status(200).send({ apartment })
            })
            .catch((err) => {
                res.status(404).send({ message: `apartment not found!` })
            })
    },
    getAllByKodpublisher: (req, res) => {
        const id=req.params.kodPublisher
        publisher.findById(id).populate('apartment')
        //.populate({path:'kodCity',select:'-_id nameCity'})

    //  Apartment.find().populate( {path:'kodPublisher',select:'-_id phone secondPhone email'}&{Path:'kodCity',select:'-_id nameCity'}&{path:'kodKategory',select:'-_id nameKategory'})
    //         // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
    //         .then((apartmens) => {  
    //             var a=[]            
    //             apartmens.forEach(x => {
    //                 if(x.kodPublisher==req.params.kodPublisher){       
    //                     a[a.length] =x
    // }
    //                               })
    .then((a)=>{
        console.log(a.apartment)
                 res.status(200).send(a)
            })
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    },
getAllByKodKategory: (req, res) => {
    const id=req.params.kodKategory
    kategory.findById(id).populate('Apartment')
//     Apartment.find().populate( {path:'kodPublisher',select:'-_id phone secondPhone email'}&{Path:'kodCity',select:'-_id nameCity'}&{path:'kodKategory',select:'-_id nameKategory'})
//            // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
//            .then((apartmens) => {  
//                var a=[]            
//                apartmens.forEach(x => {
//                    if(x.kodKategory==req.params.kodKategory){       
//                        a[a.length] =x
//    }
//                                  })
.then((a)=>{
    console.log(id)
                res.status(200).send({a})

           })
           .catch((err) => {
               res.status(404).send({ error: err.message })
           })
   },
   getAllByKodCity: (req, res) => {
    const id=req.params.kodCity
    city.findById(id).populate('Apartment')
   .then((a)=>{
                                                       //    const weather=  city.getWeather(req.params.kodCity)
                res.status(200).send({a})

           })
           .catch((err) => {
               res.status(404).send({ error: err.message })
           })
   },


   getAllByCountBeds: (req, res) => {
    Apartment.find().populate( {path:'kodPublisher',select:'-_id phone secondPhone email'})
    .find().populate({Path:'kodCity',select:'-_id nameCity'})
    .find().populate({path:'kodKategory',select:'-_id nameKategory'})
           // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
           .then((apartmens) => {  
               var a=[]            
               apartmens.forEach(x => {
                if(req.params.numBeds>3){
                   if(x.numBeds>3){       
                       a[a.length] =x
   }}
  else if(req.params.numBeds<3){
    if(x.numBeds<3){       
        a[a.length] =x
}}
else{
    if(x.numBeds==3){       
        a[a.length] =x
      }}                               })
                res.status(200).send({a})

           })
           .catch((err) => {
               res.status(404).send({ error: err.message })
           })
   },




   getAllByPriceToNight: (req, res) => {
    Apartment.find().populate( {path:'kodPublisher',select:'-_id phone secondPhone email'}).find().populate( {Path:'kodCity',select:'-_id nameCity'}).find().populate( {path:'kodKategory',select:'-_id nameKategory'})
           // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
           .then((apartmens) => {  
               var a=[]            
               apartmens.forEach(x => {
                   if(x.price>req.params.BiggerThen&&x.price<req.params.SmallerThen){       
                       a[a.length] =x
   }
                                 })
            res.status(200).send({a})

           })
           .catch((err) => {
               res.status(404).send({ error: err.message })
           })
   },
}