const app = require("express");
const route = app.Router();
const ContactController = require("../controller/contactcontroller")
const BlogController = require("../controller/blogcontroller")
const TestimonialController = require("../controller/testimonialController");
// const AdminController = require("../controller/admincontroller")
const YoutubeLinkController = require("../controller/youtubelinkcontroller");
const SubscriptionController = require("../controller/subscriptioncontroller");
const AdminAuth = require("../middleware/adminAuth");



// //  for admin Login
// route.post("/api/v3/adminLogin",AdminController.AdminLogin);
// // route.post("/api/v3/adminLogout",AdminAuth,UserController.Logout);




// // for admin 
// route.get("/api/v3/admin/adminuser",AdminController.FindAdmin);
// route.post("/api/v3/admin/adminuser",AdminController.CreateAdmin);
// route.patch("/api/v3/admin/adminuser",AdminController.UpdateAdmin);
// route.delete("/api/v3/admin/adminuser",AdminController.DeleteAdmin);
// route.get("/api/v3/admin/individual",IsAdminLoggedin.auth);

// for contact api
route.get("/api/v3/contact",ContactController.FindContact);
route.post("/api/v3/contact",ContactController.CreateContact);
route.delete("/api/v3/admin/contact",ContactController.DeleteContact);





// for blog data api
route.post("/api/v3/admin/blog",BlogController.CreateBlog);
route.get("/api/v3/blog",BlogController.FindBlog);
route.patch("/api/v3/admin/blog/:id",BlogController.UpdateBlog);
route.delete("/api/v3/admin/blog/:id",BlogController.DeleteBlog);


// for testimonials
route.post("/api/v3/admin/testimonial",TestimonialController.CreateTestimonial);
route.get("/api/v3/testimonial",TestimonialController.FindTestimonail);
route.patch("/api/v3/admin/testimonial",TestimonialController.UpdateTestimonial);
route.delete("/api/v3/admin/testimonial",TestimonialController.DeleteTestimonial);


// for youtube link
route.post("/api/v3/admin/youtubelink",YoutubeLinkController.CreateVideo);
route.get("/api/v3/youtubelink",YoutubeLinkController.FindVideo);
route.delete("/api/v3/admin/youtubelink",YoutubeLinkController.DeleteVideo);



// for subscription find and create
route.post("/api/v3/subscription",SubscriptionController.CreateSubscription);
route.get("/api/v3/subscription",SubscriptionController.FindSubscription);

module.exports = route


