let currentTask=0;
let currentTime=600;//(10AM)
let SimulatorOver=false;

const tasks=[{ 
task:"Cook",timeCost:5},{
task:"Eat",timeCost:30},{ 
task:"Brush your teeth",timeCost:5},{ 
task:"Change into everyday clothes",timeCost:10},{ 
task:"Check your emails",timeCost:10},{ 
task:"Work on your project",timeCost:180},{ 
task:"Cook",timeCost: 5},{
task:"Eat",timeCost:30},{
task:"Hobby",timeCost:300},{
task:"Cook",timeCost:5},{
task:"Eat",timeCost:30},{
task:"Brush your teeth",timeCost:5},{
task:"Shower",timeCost:30},{
task:"Change into PJ's",timeCost:10},
];

const distractions=[{
message:"Phone buzzes!",timeCost:15},{ 
message:"Sudden urge to reorganize your room!",timeCost:240},{ 
message:"Scroll social media!",timeCost:60},{ 
message:"Random daydreaming!",timeCost:25},{ 
message:"Start a new  random task!",timeCost:60},{
message:"Binge a tv show!",timeCost:180},{
message:"Watch a episode!",timeCost:60},
];

function loadTasks(){
const taskList=document.getElementById("tasks");
tasks.forEach((task,index) => {
const li=document.createElement("li");
li.textContent = `${task.task} (Time Cost: ${task.timeCost} mins)`;
li.id=`task-${index}`;
taskList.appendChild(li);
});
}

function formatTime(minutes){
const hours=Math.floor(minutes / 60);
const mins=minutes % 60;
const period=hours >= 12 ? "PM" : "AM";
const displayHours=hours % 12 || 12;
return`${displayHours}:${mins.toString().padStart(2, "0")} ${period}`;
}

function updateClock(){
const clock=document.getElementById("clock");
clock.textContent=`Current Time: ${formatTime(currentTime)}`;
}
if (currentTime >= 1440){//(12AM)
currentTime -= 1440;
}

function nextEvent(){
const eventMessage=document.getElementById("event-message");
if (SimulatorOver){
eventMessage.textContent="The day is over. I'm tired. Time for bed.";
return;
}

if (currentTime >= 1410){//(11:30PM)
SimulatorOver=true;
eventMessage.textContent="The day is over. I'm tired. Time for bed.";
updateClock();
return;
}

if(currentTask < tasks.length){
const randomDistraction = Math.random() < 0.25;
if (randomDistraction) {
const distraction = distractions[Math.floor(Math.random() * distractions.length)];
eventMessage.textContent = distraction.message;
currentTime += distraction.timeCost;
} 
else{
eventMessage.textContent = `You completed: ${tasks[currentTask].task}`;
currentTime += tasks[currentTask].timeCost;
document.getElementById(`task-${currentTask}`).style.textDecoration = "line-through";
currentTask++;
}
} 
else{
eventMessage.textContent = "All tasks are done for the day! Time to relax.";
}
updateClock();
}


document.getElementById("next-event").addEventListener("click", nextEvent);
updateClock();
loadTasks();