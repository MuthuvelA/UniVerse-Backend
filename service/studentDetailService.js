const StudentDetail = require('../model/studentDetailModel');


const create = async (studentDetailData) => {
    try {
        const newStudentDetail = await StudentDetail.create(studentDetailData);
        return newStudentDetail;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getAll = async () => {
    try {
        const studentDetails = await StudentDetail.find();
        return studentDetails;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getByRollno = async (Rollno) => {
    try {
        const studentDetail = await StudentDetail.findOne({ rollno:Rollno});
        return studentDetail;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getByYear=async(Year)=>{
    try {
        const studentbyYear=await StudentDetail.find({currentyear:Year});
        return studentbyYear;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateByRollno = async (rollno, updatedData) => {
    try {
        const updatedStudentDetail = await StudentDetail.findOneAndUpdate({ rollno: rollno }, updatedData, { new: true });
        return updatedStudentDetail;
    } catch (error) {
        throw new Error(error.message);
    }
};



module.exports = {
    create,
    getAll,
    getByRollno,
    getByYear,
    updateByRollno,
    
};
