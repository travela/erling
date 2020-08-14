export default (req, res, next) => {
    const decodedTokenData = req.tokenData;
    const userRecord = await UserModel.findOne({ _id: decodedTokenData._id })
   
     req.currentUser = userRecord;
   
    if(!userRecord) {
      return 
    } else {
      return next();
    }
   }