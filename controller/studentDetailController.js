const studentDetailService = require('../service/studentDetailService');

exports.createStudentDetail = async (req, res) => {
    try {
        const newStudentDetail = await studentDetailService.create(req.body);
        res.status(201).json(newStudentDetail);
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, message: error.message });
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
        const updatedStudentDetail = await studentDetailService.updateByRollno(req.body.rollno, req.body);
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
