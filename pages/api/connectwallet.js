import connectDB from "../../middleware/mongodb";
import MunicipalitySchema from "../../models/Municipality.schema";
const handler=async(req,res)=>{
    const {accessToken,address}=req.body
    const User=await MunicipalitySchema.findOne({accessToken})
    if(User!=undefined || User!=null)
    {
        User.metamaskAddress=address
        User.save()
        .then(result=>{
            res.status(200).send({message:'User updated successfully'})
        })
        .catch(err=>{
            res.status(400).send({message:err})
        })
    }
    else{
        res.status(400).send({message:'No muncipaltiy Found'})   
    }
}
export default connectDB(handler);