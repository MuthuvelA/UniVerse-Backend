const studentDetailService = require('../service/studentDetailService');

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
        
        const studentDetail = await studentDetailService.getByRollno(req.body.rollno);
        if (studentDetail) {
            res.status(200).json(studentDetail);
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
        const updatedStudentDetail = await studentDetailService.updateByRollno(req.body.rollNo, req.body.value);
        if (updatedStudentDetail) {
            res.status(200).json(updatedStudentDetail);
        } else {
            res.status(404).json({ status: false, message: "Student detail not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};


exports.initUserController = async(req,res)=>{
      try {
        const {department,section,currentYear,rollNos} = req.body;
        rollNos.forEach(async(element)=> {
            try {
                await studentDetailService.initUser(department,currentYear,section,element.rollno,element.name);
            } catch (error) {
                console.log(error.message);
            }
        });
         res.status(200).json({message:"user Add sucessfully"});
      } catch (error) {
        res.status(404).json({error:error.message});
      }
}
