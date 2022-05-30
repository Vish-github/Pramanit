import connectDB from "../../middleware/mongodb";
import BirthApplication from "../../models/BirthApplication.schema";
const handler=async(req,res)=>{
    const {applicant_id}=req.body
    let User=await BirthApplication.findOne({applicant_id})
    if(User!=undefined || User!=null)
    User=req.body
    User.save()
    .then(result=>{
        res.status(200).send({message:'User Updated successfully'})
    })
    .catch(err=>{
        res.status(400).send({message:err})
    })

}
export default connectDB(handler);