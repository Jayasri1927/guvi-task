//1.

db.topics.find({month:"October"})

//2.

db.company-drives.find({date:{$gt:new Date("2020-10-15"),$lt:new Date("31-10-2020")}})

//3.

db.company-drives.find().forEach(function(value){
    print("Company Name : " + value.company_name);
    print("Students Appeared : " + value.students_appeared);
})

//4.

db.codektat.find().forEach(function(value){
    print("Name : " + value.user_name);
    print("Problems Solved : " + value.problems_solved);
})

//5.

db.mentors.find({mentees_count : {$gt:15}})

//6.

db.usertask.find({date:{$gt:new Date("2020-10-15"),$lt:new Date("2020-10-31")}}).forEach(function(value){
    print("Name : " +value.user_name);
    print("Attendance : " + value.attendance);
    print("Task : " + value.task_submission);
})