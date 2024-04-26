const StudentDetail = require('../model/studentDetailModel');
const loginModel = require('../model/loginModel');
const db = require('../config/db');

class studentDetailsService{

  static async getAll(){
    try {
      const collection = db.collection("studentdetaildbs");
      const allDetails = await collection.find();
      const arrayAllDetails = await allDetails.toArray();
      console.log(arrayAllDetails);
      return  arrayAllDetails;
    } catch (error) {
      throw error;
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
    
    static async updateByRollno(rollno, updatedData,col){
        try {
            const collection = db.collection(col);
            const updatedStudentDetail = await collection.updateOne({ rollNo: rollno }, {$set:updatedData});
            return updatedStudentDetail;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async getByDeptYear(data){
        try {
            const collection = db.collection("studentdetaildbs");
            const deptDetails = await collection.find(data).sort({rollNo:1});
            const arrayDeptDetails = await deptDetails.toArray();
            return arrayDeptDetails; 
            
        } catch (error) {
            throw error;
        }
    }


    static async initUser(dept,year,sec,roll,username,leet,chef,forces){
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
                    "codechefCurrentRating": 0,
                    "codechefGlobalRanking": 0,
                    "codechefStarRating" : ""
                  },
                  "problemSolved": {
                    "codechefTotal": 0
                  }
                },
                {
                  "platform": "codeforces",
                  "contest": {
                    "position":"",
                    "codeforcesRating": 0
                  },
                  "problemSolved": {
                    "codeforcesTotal": 0
                  }
                }
              ]
              console.log("Year : ",year);
              const newLogin = new loginModel({username:roll,password:roll,name:username});
              await newLogin.save();
              const newStudentDetail = new StudentDetail({name:username,section:sec,leetcode:leet,codechef:chef,codeforces:forces,rollNo:roll,currentYear:year,department:dept,codingDetails:value});
              return await newStudentDetail.save();
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = studentDetailsService;
