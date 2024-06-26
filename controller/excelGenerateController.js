const studentDetailsService = require('../service/studentDetailService');
const excel = require("exceljs"); 


async function formateData(data,details){
  const newData = [];
  for(let idx = 0;idx<data.length;idx++){
    const obj = {
      sno:idx+1,
      name:((data[idx]["name"]==null ||data[idx]["name"]=="") ?"NIL":data[idx]["name"]),
      rollNo:((data[idx]["rollNo"]==null ||data[idx]["rollNo"]=="") ?"NIL":data[idx]["rollNo"])
    };
    details.coding.forEach((element)=>{
      if(element=="leetcode"){
        obj["leetcodeEasy"] = data[idx].codingDetails[0].problemSolved.leetcodeEasy;
        obj["leetcodeMedium"] = data[idx].codingDetails[0].problemSolved.leetcodeMedium;
        obj["leetcodeHard"] = data[idx].codingDetails[0].problemSolved.leetcodeHard;
        obj["leetcodeNoContest"] = data[idx].codingDetails[0].contest.leetcodeNoContest;
        obj["leetcodeRating"] = parseInt(data[idx].codingDetails[0].contest.leetcodeRating);
      }
      if(element=="codechef"){
        obj["codechefTotal"] = data[idx].codingDetails[1].problemSolved.codechefTotal;
        obj["codechefStar"] = data[idx].codingDetails[1].contest.codechefStarRating;
        obj["codechefRating"] = data[idx].codingDetails[1].contest.codechefCurrentRating;
      }
      if(element=="codeforces"){
        obj["codeforcesTotal"] = data[idx].codingDetails[2].problemSolved.codeforcesTotal;
        obj["codeforcesRating"] = data[idx].codingDetails[2].contest.codeforcesRating;
      }
    });
    details.personal.forEach(element => {
      if(element!="name" && element!="rollNo"){
      obj[`${element}`] = ((data[idx][`${element}`]==null ||data[idx][`${element}`]=="") ?"NIL":data[idx][`${element}`]);
      }
    });
    newData.push(obj);
  }
  return newData;
}


async function formateColumn(obj,data){
  var column = [
      {header:"SNo",key:"sno",width:5},
  ];
  const constDetails = ["rollNo","name"];
  constDetails.forEach(element => {
    var maxLength = element.length+5;
    data.forEach((value)=>{
        if(value[`${element}`]!=null && (value[`${element}`]).toString().length>maxLength) maxLength = (value[`${element}`]).toString().length;
    });
    const newHeader = {header:`${element}`,key:`${element}`,width:maxLength+5};
    column.push(newHeader);
});

  obj.coding.forEach((value)=>{
    if(value=="leetcode"){
        column.push({header:"",key:"leetcodeEasy",width:10});
        column.push({header:"",key:"leetcodeMedium",width:10});
        column.push({header:"",key:"leetcodeHard",width:10});
        column.push({header:"",key:"leetcodeNoContest",width:20});
        column.push({header:"",key:"leetcodeRating",width:10});
    }
    if(value=="codechef"){
        column.push({header:"",key:"codechefTotal",width:20});
        column.push({header:"",key:"codechefStar",width:20});
        column.push({header:"",key:"codechefRating",width:20});
    }
    if(value=="codeforces"){
        column.push({header:"",key:"codeforcesTotal",width:20});
        column.push({header:"",key:"codeforcesRating",width:20});
    }
});
  obj.personal.forEach(element => {
    if(element!="name" && element!="rollNo"){
      var maxLength = element.length+5;
      data.forEach((value)=>{
          if(value[`${element}`]!=null && (value[`${element}`]).toString().length>maxLength) maxLength = (value[`${element}`]).toString().length;
      });
      const newHeader = {header:`${element}`,key:`${element}`,width:maxLength+5};
      column.push(newHeader);
    }
  });
  
  return column;
}


async function createExcelWithSubcolumns(column,data,details) {
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = column;
  var curIdx = 67;
  details.coding.forEach(async(value)=>{
      if(value.toLocaleLowerCase()==="leetcode"){
          worksheet.mergeCells(`${String.fromCharCode(curIdx+1,49)}:${String.fromCharCode(curIdx+5,49)}`);
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49)}`).value = "Leetcode";
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49+1)}`).value = "Easy";
          worksheet.getCell(`${String.fromCharCode(curIdx+2,49+1)}`).value = "Medium";
          worksheet.getCell(`${String.fromCharCode(curIdx+3,49+1)}`).value = "Hard";
          worksheet.getCell(`${String.fromCharCode(curIdx+4,49+1)}`).value = "No of Contest";
          worksheet.getCell(`${String.fromCharCode(curIdx+5,49+1)}`).value = "Rating";
          curIdx+=5;
      }
      if(value.toLocaleLowerCase()==="codechef"){
          worksheet.mergeCells(`${String.fromCharCode(curIdx+1,49)}:${String.fromCharCode(curIdx+3,49)}`);
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49)}`).value = "CodeChef";
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49+1)}`).value = "Total Problem";
          worksheet.getCell(`${String.fromCharCode(curIdx+2,49+1)}`).value = "Star rating";
          worksheet.getCell(`${String.fromCharCode(curIdx+3,49+1)}`).value = "Rating";
          curIdx+=3;
      }
      if(value.toLocaleLowerCase()==="codeforces"){
          worksheet.mergeCells(`${String.fromCharCode(curIdx+1,49)}:${String.fromCharCode(curIdx+2,49)}`);
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49)}`).value = "CodeForces";
          worksheet.getCell(`${String.fromCharCode(curIdx+1,49+1)}`).value = "Total Problem";
          worksheet.getCell(`${String.fromCharCode(curIdx+2,49+1)}`).value = "rating";
          curIdx+=2;
      }
  });
worksheet.addRows(data);
await workbook.xlsx.writeFile(`newExcel${Date.now()}.xlsx`);
const buffer = await workbook.xlsx.writeBuffer();
return buffer.toString('base64');
}



exports.GenerateExcel = async(req,res)=>{
      try {
        const details = req.body;
        const {username} = details;
        console.log(details);
        var currentYear;
        if(parseInt(username[1])===1) currentYear = 'I';
        else if(parseInt(username[1])===2) currentYear = "II";
        else if(parseInt(username[1])===3) currentYear = "III";
        else currentYear = "IV";
        const data = await studentDetailsService.getByDeptYear({department:`${username[2]+username[3]}E`,currentYear});
        console.log("DATA  : ",data);
        const formatedData = await formateData(data,details);
        const column = await formateColumn(details,formatedData);
        const base64 = await createExcelWithSubcolumns(column,formatedData,details);
        
        res.status(200).json({status:true,message:base64});
      } catch (error) {
        res.status(404).json({status:false,message:error.message});
      }
};