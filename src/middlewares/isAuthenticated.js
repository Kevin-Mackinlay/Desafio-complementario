export default isAuthenticated = (Permissions) => (req, res, next) => {
    //no debe estar logeado
    if (Permissions.includes("guest") && req.isAuthenticated()) {
        return res.status(401).json({success: false, message: "Unauthorized", redirectUrl: "/home"});

    }

    // Debe estar logeado
    if (Permissions.includes("user") && !req.isAuthenticated()) {
        return res.status(401).json({success: false, message: "Unauthorized", redirectUrl: "/error"});
    }

//solo roles especificos
if ((permissions.includes("premium") || permissions.includes("admin")) && !permissions.includes(req.user.role)) {
		return res.status(403).json({ success: false, message: "Forbidden", redirectUrl: "/error" });
	}

    next();

}





// export default function (req, res, next) {
//   if (req.isAuthenticated()) {
//    res.redirect("/products");
//   } else {
//     next();
//   }
// }

  
// function isAuthenticated (req, res, next) {
//     console.log(req.session);
//     if(req.session?.user?.role === "user" || req.session?.user?.role === "admin"){
//         return next() 
//     }
//     return res.render("erro401", {title: "401", style:"error401.css"})
// }

// export default isAuthenticated;