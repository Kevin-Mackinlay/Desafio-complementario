// export default function (req, res, next) {
//   if (req.isAuthenticated()) {
//    res.redirect("/products");
//   } else {
//     next();
//   }
// }

  
function isAuthenticated (req, res, next) {
    console.log(req.session);
    if(req.session?.user?.role === "user" || req.session?.user?.role === "admin"){
        return next() 
    }
    return res.render("erro401", {title: "401", style:"error401.css"})
}

export default isAuthenticated;