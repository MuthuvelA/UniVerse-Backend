const studentDetailService = require('../service/studentDetailService');
const { iterater } = require('./updateCodingProfile');

exports.getAllStudentDetails = async (req, res) => {
    try {
        const studentDetails = await studentDetailService.getAll();
        res.status(200).json(studentDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.getStudentDetailByRollno = async (req, res) => {
    try {
        
        const userDetails = await studentDetailService.getByRollno(req.body.rollNo);
        if (userDetails) {
            res.status(200).json({status:true,userDetails});
        } else {
            res.status(404).json({ status: false, message: "Student detail not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.getStudentDetailByYear = async (req, res) => {
    try {
        const studentbyYear = await studentDetailService.getByYear(req.body.year);
        if (studentbyYear) {
            res.status(200).json(studentbyYear);
        } else {
            res.status(404).json({ status: false, message: "Students detail not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.updateStudentDetailByRollno = async (req, res) => {
    try {
        var collection = "studentdetaildbs";
        const {type,value} = req.body;
        if(type==="Teacher") collection = "staffdetaildbs";

        const detail = {...value.coding,...value.personal};
        // console.log(detail);
        const updatedStudentDetail = await studentDetailService.updateByRollno(req.body.username,detail,collection);
        await iterater([detail]);
        if (updatedStudentDetail) {
            res.status(200).json({status:true,message:updatedStudentDetail});
        } else {
            res.status(404).json({ status: false, message: "Student detail not found" });
        }
        console.log("update value",detail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};


exports.initUserController = async(req,res)=>{
      try {
        const {department,section,year,rollNos} = req.body;
        rollNos.forEach(async(element)=> {
            try {
                await studentDetailService.initUser(department,year,section,element.rollno,element.name,element.LeetCode,element.CodeChef,element.Codeforces);
            } catch (error) {
                console.log(error.message);
            }
        });
         res.status(200).json({message:"user Add sucessfully"});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
}
