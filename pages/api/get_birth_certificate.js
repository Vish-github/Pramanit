import connectDB from "../../middleware/mongodb";
import BirthApplication from "../../models/BirthApplication.schema";


const handler=async(req,res)=>{
    const data=await BirthApplication.find()
    var accepted=[]
    var rejected=[]
    var pending=[]
    console.log(data)
    if(data!=undefined || data!=null){
            for(let i=0;i<data.length;i++){
                if(data[i].issued===1){
                    accepted.push(data[i])
                }
                else if(data[i].issued===-1){
                    rejected.push(data[i])
                }
                else{
                    pending.push(data[i])
                }
            }
            const allData={accepted,rejected,pending}
           return res.status(200).send({allData})
    }
    else{
        return res.status(404).send({error:'No data find'})
    }   
}

export default connectDB(handler);