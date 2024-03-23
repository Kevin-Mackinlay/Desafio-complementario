import Eerrors from "./errorHandling.js";

export default (error, req, res,next) => {
    console.log(error.cause);
    switch (error.code) {
        case Eerrors.INVALID_TYPES_ERROR:
            res.send({status:"error", error: error.name})
            break;
            default:
                res.send({status:"error", error: "Unhandled error"})

}
}