import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer"

// const upload = multer({dest:'uploads/'})


var storage = multer.diskStorage({
    destination: (req, file, cb) =>{

        //ensure that this folder already exists in your project directory
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});



const upload = multer({storage: storage})










// const path = require('path');

// app.set("view engine", "ejs");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// var upload = multer({ storage: storage });

// var uploadMultiple = upload.fields([{ name: 'upload_aadhar', maxCount: 1 }, { name: 'upload_pan', maxCount: 1 }]);




const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())





mongoose.connect("mongodb://localhost:27017/myloginDB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

// creating Schemas

const userSchema = mongoose.Schema({
    userid: String,
    password: String,
})


const personalinfoSchema = mongoose.Schema({
    employee_code:String,
    full_name:String,
    gender:String,
    marital_status:String,
    fathers_name:String,
    mothers_name:String,
    contact_number:String,
    personal_email_id:String,
    dob:String,
    blood_group:String,
    permanent_address:String,
    state_permanent:String,
    district_permanent:String,
    pincode_permanent:String,
    current_address:String,
    state_current:String,
    district_current:String,
    pincode_current:String,
    skype_id : String,
    linked_handle:String,
    emergency_contact_person:String,
    relationship:String,
    Type_relationship:String,
    emergency_contact_number:String,
    disability:String,
    last_updated: String

 
   



})

const documentsinfoSchema = mongoose.Schema({
    employee_code : String,
    aadhar_no : String,
    upload_aadhar : String,
    pan_no: String,
    upload_pan: String,
    passport_no :String, 
    passport_issue_place : String,
    passport_issue_date : String,
    passport_expiry_date : String,
    bank_name : String,
    bank_account_no : String,
    ifsc_code: String,
    last_updated: String

})
    

const educationinfoSchema = mongoose.Schema({
    employee_code : String,
    full_name :  String,
    phd_field:String,
    phd_research_topic:String,
    university: String,
    university_place: String,
    phd_tenure: String,
    pg_branch: String,
    pg_degree_university: String,
    pg_place:String,
    pg_percentage_cgpa: String,
    ug_branch: String,
    ug_university:String,
    ug_place:String,
    ug_percentage_cgpa:String,
    matriculation_board: String,
    if_state_board:String,
    matriculation_school_name:String,
    school_place: String,
    matriculation_percentage_cgpa: String,
    intermediate_board: String,
    intermediate_state_board_if:String,
    intermediate_school_name:String,
    intermediate_school_place: String,
    intermediate_percentage_cgpa: String,
    last_updated: String

})

const previousinfoSchema= mongoose.Schema({
    employee_code : String,
    last_company_name1:String,
    designation1: String,
    doj1: String,
    dol1: String,
    last_company_name2: String,
    designation2: String,
    doj2: String,
    dol2: String,
    last_company_name3: String,
    designation3: String,
    doj3: String,
    dol3: String,
    last_company_name4: String,
    designation4: String,
    doj4: String,
    dol4: String,
    last_company_name5: String,
    designation5: String,
    doj5: String,
    dol5: String,
    last_company_name6:String,
    designation6: String,
    doj6: String,
    dol6: String,
    last_company_name7: String,
    designation2: String,
    doj7: String,
    dol7: String,
    last_company_name8: String,
    designation8: String,
    doj8: String,
    dol8: String,
    last_company_name9: String,
    designation9: String,
    doj9: String,
    dol9: String,
    last_company_name10: String,
    designation10: String,
    doj10: String,
    dol10: String,
    last_updated: String

})

const officeinfoSchema = mongoose.Schema({
    employee_code : String,
    designation:String,
    doj:String,
    office_location:String,
    official_email_id:String,
    reference_person_name:String,
    designation_of_person:String,
    how_do_you_know_about_this_job:String,
    last_updated: String
})

const employeecodeSchema = mongoose.Schema({employee_code: Number });

// Creating models

const User = new mongoose.model("User",userSchema)

const PersonalDetails = new mongoose.model("PersonalDetails", personalinfoSchema)

const Documents = new mongoose.model("Documents", documentsinfoSchema)

const Educations = new mongoose.model("Educations",educationinfoSchema)

const Previousdetails = new mongoose.model("Previousdetails",previousinfoSchema)

const OfficeDetails = new mongoose.model("OfficeDetails",officeinfoSchema)

const employeeCode = new mongoose.model("employeCode", employeecodeSchema)

// Routes

app.post("/login", (req,res)=> {


    const {userid,password} = req.body

    const user= new User({
        userid:userid,
        password:password
    })
    
    User.findOne({userid: userid}, (err, user) =>{
        if(user){
            if(password=== user.password){

                res.send({message: "Login is Successfull", user: user})
            } else {
                res.send({ message: "Password is incorrect"})
            }
            
        } else {
            res.send({message: "User not registered"})
        }
    })

})

function gettimestamp(){

    var dateTimeStamp = Date.now();
    var dateObject = new Date(dateTimeStamp);
    var utcYearFromTS = dateObject.getUTCFullYear();
    var utcMonthFromTS = dateObject.getUTCMonth() + 1;
    var utcDateFromTS = dateObject.getUTCDate();
    var TimeFromTS = dateObject.getHours();
    var MinutesFromTS = dateObject.getMinutes();
    // console.log("UTC Date in DD/MM/YYYY HH:MM  " + utcDateFromTS + "/"
    // + utcMonthFromTS + "/" + utcYearFromTS + " " + utcTimeFromTS + "hrs : " + utcMinutesFromTS + "minutes");
    var last_Updated= utcDateFromTS + "/"
    + utcMonthFromTS + "/" + utcYearFromTS + " " + TimeFromTS + "hrs : " + MinutesFromTS + "minutes" ;
    
    return last_Updated;
    
}    

app.post("/personaldetails", (req,res)=> {
    const ts1 = gettimestamp();

    const {employee_code, full_name,gender,marital_status,fathers_name,mothers_name,contact_number, dob,blood_group,personal_email_id, permanent_address, state_permanent, district_permanent,pincode_permanent,current_address,state_current,
        district_current,
        pincode_current,
        skype_id  ,
        linked_handle,
        emergency_contact_person,
    relationship,
    Type_relationship,
    emergency_contact_number,
    disability } = req.body


    const personalInfo= new PersonalDetails ({
        

        employee_code : employee_code ,
        full_name : full_name,
        gender : gender,
        marital_status :marital_status,
        fathers_name :fathers_name,
        mothers_name :mothers_name,
        contact_number :contact_number,
        personal_email_id :personal_email_id,
        dob :dob,
        blood_group:blood_group ,
        permanent_address :permanent_address,
        state_permanent :state_permanent,
        district_permanent :district_permanent,
        pincode_permanent :pincode_permanent,
        current_address :current_address,
        state_current :state_current,
        district_current :district_current,
        pincode_current :pincode_current,
        skype_id :skype_id ,
        linked_handle :linked_handle,
        emergency_contact_person :emergency_contact_person,
        relationship :relationship,
        Type_relationship :Type_relationship,
        emergency_contact_number :emergency_contact_number,
        disability :disability,
        last_updated:ts1


    })

    personalInfo.save(function(err, Details) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Personal Details successfully saved!"})
        }
        console.log(personalInfo)
    })
    PersonalDetails.findOneAndUpdate({employee_code:req.body.employee_code},{ employee_code : employee_code,full_name : full_name  ,
        gender :gender,marital_status : marital_status,fathers_name : fathers_name,mothers_name : mothers_name, contact_number : contact_number,personal_email_id: personal_email_id,
        dob :dob,blood_group : blood_group,permanent_address : permanent_address, state_permanent:state_permanent,district_permanent:district_permanent,pincode_permanent:pincode_permanent, current_address :current_address,state_current:state_current,
        district_current:district_current,
        pincode_current:pincode_current,skype_id :skype_id ,
        linked_handle :linked_handle  ,
        emergency_contact_person :emergency_contact_person ,
        relationship :relationship ,
        Type_relationship :Type_relationship  ,
        emergency_contact_number :emergency_contact_number  ,
        disability:disability,last_updated:ts1},{new:true},(error,updatedRecord)=>{
            PersonalDetails.find({employee_code:req.body.employee_code},(err,personalsuser)=>{
                personalsuser[0].remove();
            // console.log(updatedRecord);
            })
     
        
    })
})

app.post("/documentation", (req,res)=> {
    const ts2= gettimestamp();
    const {employee_code,aadhar_no,upload_aadhar, pan_no,upload_pan , passport_no, passport_issue_place,passport_issue_date,passport_expiry_date, bank_name, bank_account_no, ifsc_code } = req.body

    const documentsInfo= new Documents ({
        employee_code : employee_code,
            
        aadhar_no :aadhar_no ,
        upload_aadhar : upload_aadhar,
        pan_no: pan_no,
        upload_pan: upload_pan,
        passport_no :passport_no, 
        passport_issue_place : passport_issue_place,
        passport_issue_date : passport_issue_date,
        passport_expiry_date :passport_expiry_date ,
        bank_name :bank_name ,
        bank_account_no :bank_account_no ,
        ifsc_code:ifsc_code ,
        last_updated:ts2
    })

    documentsInfo.save(function(err, result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Documents Details successfully saved!"})
        }
    })
    Documents.findOneAndUpdate({employee_code:req.body.employee_code},{employee_code : employee_code,
            
        aadhar_no :aadhar_no ,
        upload_aadhar : upload_aadhar,
        pan_no: pan_no,
        upload_pan: upload_pan,
        passport_no :passport_no, 
        passport_issue_place : passport_issue_place,
        passport_issue_date : passport_issue_date,
        passport_expiry_date :passport_expiry_date ,
        bank_name :bank_name ,
        bank_account_no :bank_account_no ,
        ifsc_code:ifsc_code,last_updated:ts2},{new:true}, (err,updatedDocuments)=>{
            Documents.find({employee_code:req.body.employee_code},(err,documentsuser)=>{
                documentsuser[0].remove();
            // console.log(updatedDocuments);
            })
    })
})


  
// app.post('/uploadfile', uploadMultiple, (req, res) =>{
//     if(req.files){
//         console.log(req.files)
//         console.log("Documents uploaded")
//     }
      
// })
// app.get("/", (req, res) => {
//     res.render("index");
// });

app.post("/education", (req,res)=> {
    const ts3=gettimestamp();
    const {employee_code, phd_field,phd_research_topic,university,university_place, phd_tenure,pg_branch ,pg_degree_university, pg_place,pg_percentage_cgpa,ug_branch,ug_university,ug_place, ug_percentage_cgpa,matriculation_board,if_state_board, matriculation_school_name,school_place,matriculation_percentage_cgpa , intermediate_board ,intermediate_state_board_if,intermediate_school_name,intermediate_school_place , intermediate_percentage_cgpa} = req.body

    const educationinfo= new Educations ({
        employee_code : employee_code,
    
        phd_field:phd_field,
        phd_research_topic:phd_research_topic,
        university: university,
        university_place: university_place,
        phd_tenure: phd_tenure,
        pg_branch:pg_branch ,
        pg_degree_university: pg_degree_university,
        pg_place:pg_place,
        pg_percentage_cgpa: pg_percentage_cgpa,
        ug_branch: ug_branch ,
        ug_university: ug_university,
        ug_place:ug_place,
        ug_percentage_cgpa:ug_percentage_cgpa,
        matriculation_board: matriculation_board,
        if_state_board:if_state_board,
        matriculation_school_name:matriculation_school_name,
        school_place:school_place ,
        matriculation_percentage_cgpa:matriculation_percentage_cgpa ,
        intermediate_board:intermediate_board ,
        intermediate_state_board_if:intermediate_state_board_if,
        intermediate_school_name:intermediate_school_name,
        intermediate_school_place:intermediate_school_place ,
        intermediate_percentage_cgpa: intermediate_percentage_cgpa,
        last_updated:ts3
            
        
    })

    educationinfo.save(function(err,result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Education Details successfully saved!"})
        }
        // console.log(educationinfo);
    })

    Educations.findOneAndUpdate({employee_code:req.body.employee_code},{ employee_code : employee_code,
    
        phd_field:phd_field,
        phd_research_topic:phd_research_topic,
        university: university,
        university_place: university_place,
        phd_tenure: phd_tenure,
        pg_branch:pg_branch ,
        pg_degree_university: pg_degree_university,
        pg_place:pg_place,
        pg_percentage_cgpa: pg_percentage_cgpa,
        ug_branch: ug_branch ,
        ug_university: ug_university,
        ug_place:ug_place,
        ug_percentage_cgpa:ug_percentage_cgpa,
        matriculation_board: matriculation_board,
        if_state_board:if_state_board,
        matriculation_school_name:matriculation_school_name,
        school_place:school_place ,
        matriculation_percentage_cgpa:matriculation_percentage_cgpa ,
        intermediate_board:intermediate_board ,
        intermediate_state_board_if:intermediate_state_board_if,
        intermediate_school_name:intermediate_school_name,
        intermediate_school_place:intermediate_school_place ,
        intermediate_percentage_cgpa: intermediate_percentage_cgpa,last_updated:ts3},{new:true},(err,updatedEducation)=>{
            Educations.find({employee_code:req.body.employee_code},(err,educationuser)=>{
                educationuser[0].remove();
            // console.log(updatedEducation);
            })
    })    


})

app.post("/previousemployment", (req,res)=> {
    const ts4= gettimestamp();
    const {employee_code,last_company_name1,designation1,doj1,dol1, last_company_name2, designation2,doj2,dol2, last_company_name3,designation3,doj3,dol3,last_company_name4,designation4, doj4,dol4,last_company_name5,designation5,doj5,dol5,last_company_name6,designation6,doj6,dol6,last_company_name7,designation7,doj7,dol7,last_company_name8,designation8,doj8,dol8,last_company_name9,designation9,doj9,dol9,last_company_name10,designation10,doj10,dol10} = req.body
    console.log(req.body);
    const previousinfo= new Previousdetails ({
        employee_code : employee_code,
        last_company_name1:last_company_name1,
        designation1:designation1,
        doj1:doj1,
        dol1:dol1,
        last_company_name2:last_company_name2,
        designation2:designation2,
        doj2:doj2,
        dol2: dol2,
        last_company_name3:last_company_name3,
        designation3:designation3,
        doj3:doj3,
        dol3:dol3,
        last_company_name4:last_company_name4,
        designation4:designation4,
        doj4:doj4,
        dol4:dol4,
        last_company_name5:last_company_name5,
        designation5:designation5,
        doj5:doj5,
        dol5:dol5,
        last_company_name6:last_company_name6,
        designation6:designation6,
        doj6:doj6,
        dol6:dol6,
        last_company_name7:last_company_name7,
        designation7:designation7,
        doj7:doj7,
        dol7:dol7,
        last_company_name8:last_company_name8,
        designation8:designation8,
        doj8:doj8,
        dol8:dol8,
        last_company_name9:last_company_name9,
        designation9:designation9,
        doj9:doj9,
        dol9:dol9,
        last_company_name10:last_company_name10,
        designation10:designation10,
        doj10:doj10,
        dol10:dol10,
        last_updated:ts4



    
            
        
    })

    previousinfo.save(function(err,result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Previous Employee Details successfully saved!"})
        }
        // console.log(previousinfo);
    })
    Previousdetails.findOneAndUpdate({employee_code : employee_code,
        last_company_name1:last_company_name1,
        designation1:designation1,
        doj1:doj1,
        dol1:dol1,
        last_company_name2:last_company_name2,
        designation2:designation2,
        doj2:doj2,
        dol2: dol2,
        last_company_name3:last_company_name3,
        designation3:designation3,
        doj3:doj3,
        dol3:dol3,
        last_company_name4:last_company_name4,
        designation4:designation4,
        doj4:doj4,
        dol4:dol4,
        last_company_name5:last_company_name5,
        designation5:designation5,
        doj5:doj5,
        dol5:dol5,last_company_name6:last_company_name6,
        designation6:designation6,
        doj6:doj6,
        dol6:dol6,
        last_company_name7:last_company_name7,
        designation7:designation7,
        doj7:doj7,
        dol7:dol7,
        last_company_name8:last_company_name8,
        designation8:designation8,
        doj8:doj8,
        dol8:dol8,
        last_company_name9:last_company_name9,
        designation9:designation9,
        doj9:doj9,
        dol9:dol9,
        last_company_name10:last_company_name10,
        designation10:designation10,
        doj10:doj10,
        dol10:dol10,
        last_updated:ts4},{new:true},(err,updatedPrevious)=>{
            Previousdetails.find({employee_code:req.body.employee_code},(err,previoususer)=>{
                previoususer[0].remove();
            // console.log(updatedPrevious);
            })
    })


})

app.post("/officedetails", (req,res)=> {
    const ts5= gettimestamp();
    // console.log(ts);

    const {employee_code,designation,doj,office_location,official_email_id,reference_person_name,designation_of_person,how_do_you_know_about_this_job } = req.body

    const officeInfo= new OfficeDetails ({
        employee_code : employee_code,
        designation:designation,
        doj:doj,
        office_location:office_location,
        official_email_id:official_email_id,
        reference_person_name:reference_person_name,
        designation_of_person:designation_of_person,
        how_do_you_know_about_this_job:how_do_you_know_about_this_job,
        last_updated:ts5
    


            
        
    })
    // console.log(office_location)

    officeInfo.save(function(err, result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Office Details successfully saved!"})
        }
    })
    OfficeDetails.findOneAndUpdate({employee_code:req.body.employee_code},{employee_code:req.body.employee_code,

        designation:req.body.designation,
        doj:req.body.doj,
        office_location:req.body.office_location,
        official_email_id:req.body.official_email_id,
        reference_person_name:req.body.reference_person_name,
        designation_of_person:req.body.designation_of_person,
        how_do_you_know_about_this_job:req.body.how_do_you_know_about_this_job,last_updated:ts5},{new:true},(err,updatedOffice)=>{
            OfficeDetails.find({employee_code:req.body.employee_code},(err,officeuser)=>{
                officeuser[0].remove();


            // console.log(updatedOffice);
    
            
        }
)   
    // OfficeDetails.find({employee_code:req.body.employee_code},(err,officeuser)=>{








    })




})




app.post("/test",(req,res)=>{
       
    var table = []
    var finalTable=[]
   
   
    
   
    PersonalDetails.find({},(err,personaluser)=>{
        // console.log(personaluser)
        for (let x of personaluser){
            var obj= {}
            
            
        
           
            obj["employee_code"]=x.employee_code
            obj["employee_name"]=x.full_name
            // console.log(obj)
            table.push(obj)

            // console.log(table);
        }
    // console.log(table)
    })
   
    OfficeDetails.find({},(err,user)=>{
        // console.log(user)
        for (let x of user) {
            var objTwo= {}
            objTwo["designation"]=x.designation
            objTwo["office_location"]=x.office_location
            objTwo["doj"]=x.doj
            // console.log(objTwo)

            for(let y of table){
                // console.log(y);
                if(y.employee_code == x.employee_code){
                    var newobj={...y,...objTwo}
                    // var obj = Object.assign(obj,objTwo)

                    finalTable.push(newobj)
                    
                }
            }
           
               
        }
        // console.log(table);
    // console.log(finalTable) 
    res.send(finalTable) 
    })
         
// console.log(finalTable)    
// res.send(finalTable) 

})


app.post("/details",(req,res)=>{
    // console.log(req.body);

    var finalobject={}
    PersonalDetails.find({employee_code:req.body.employee_code},(err,personaluser)=>{
        // console.log(personaluser);
        finalobject["personal_details"]= personaluser[0]

        // console.log(finalobject);

    })

    Documents.find({employee_code:req.body.employee_code},(err,documentuser)=>{

        // console.log(documentuser);

        finalobject["documentation_details"]= documentuser[0]

        // console.log(finalobject);

    })

    Educations.find({employee_code:req.body.employee_code},(err,educationuser)=>{

        // console.log(educationuser);

        finalobject["educational_details"]= educationuser[0]

    })

    Previousdetails.find({employee_code:req.body.employee_code},(err,previoususer)=>{

        // console.log(previoususer);

        finalobject["previous_employee_details"]= previoususer[0]

    })

    OfficeDetails.find({employee_code:req.body.employee_code},(err,officeuser)=>{

        // console.log(officeuser);

        finalobject["office_details"]= officeuser[0]

        // console.log(finalobject);

    res.send(finalobject)

    // console.log(finalobject);    

    })
    
    // console.log(finalobject);   

})
 
app.post('/api/image',upload.single('image'),(req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.send({code:500, msg:'error : file not selected'})

    }else{
        res.send({code:200,msg:'upload successfull'})
    }
})

app.post('/api/image1',upload.single('image1'),(req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.send({code:500, msg:'error : file not selected'})

    }else{
        res.send({code:200,msg:'upload successfull'})
    }
})



app.post("/getemployeecode",(req,res)=>{



 

    employeeCode.find({}, function(err, docs) {

        let employee_id = docs.map((employeeCode)=>{return employeeCode.employee_code});



        employee_id= Number(employee_id )+ 1 || 1;

        // console.log(employee_id)

        let emp_no= employee_id.toString();



        let first= "KC"



        let employee_code = first.concat(emp_no);

        console.log(employee_code)

        res.send(employee_code)




    })

})




app.listen(9002,()=> {
    console.log("BE  started at port 9002")
})
     