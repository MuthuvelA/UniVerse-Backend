const StudentDetail = require('../model/studentDetailModel');
const db = require('../config/db');

class studentDetailsService{
    static async create(studentDetailData){
        try {
            const newStudentDetail = await StudentDetail.create(studentDetailData);
            return newStudentDetail;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
    static async getByRollno(Rollno){
        try {
            const studentDetail = await StudentDetail.findOne({ rollno:Rollno});
            return studentDetail;
        } catch (error) {
            throw error;
        }
    }
    
    static async getByYear(Year){
        try {
            const studentbyYear=await StudentDetail.find({currentyear:Year});
            return studentbyYear;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    static async updateByRollno(rollno, updatedData){
        try {
            const updatedStudentDetail = await StudentDetail.findOneAndUpdate({ rollno: rollno }, updatedData, { new: true });
            return updatedStudentDetail;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async getByDeptYear(data){
        try {
            const collection = db.collection("studentdetaildbs");
            const deptDetails = await collection.find(data).sort({rollNo:1});
            return await deptDetails.toArray();
            
        } catch (error) {
            throw error;
        }
    }


    static async initUser(dept,year,sec,roll,username){
        try {
            const value = [
                {
                  "platform": "leetcode",
                  "contest": {
                    "leetcodeNoContest": 0,
                    "leetcodeRating": 0,
                    "leetcodeRanking": 0
                  },
                  "problemSolved": {
                    "leetcodeTotal": 0,
                    "leetcodeEasy": 0,
                    "leetcodeMedium": 0,
                    "leetcodeHard": 0
                  }
                },
                {
                  "platform": "codechef",
                  "contest": {
                    "codechefNoContest": 0,
                    "codechefRating": 0,
                    "codechefRanking": 0
                  },
                  "problemSolved": {
                    "codechefTotal": 0
                  }
                },
                {
                  "platform": "codeforces",
                  "contest": {
                    "codeforcesNoContest": 0,
                    "codeforcesRating": 0
                  },
                  "problemSolved": {
                    "codeforcesTotal": 0
                  }
                }
              ]
              const val = new StudentDetail({name:username,section:sec,rollNo:roll,currentYear:year,department:dept,codingDetails:value});
              return await val.save();
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = studentDetailsService;
