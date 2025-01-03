const countTime = document.querySelector("#time p");
const startButton = document.querySelector("#start");
const shortBreakButton = document.querySelector("#short-break");
const studyTimeButton = document.querySelector("#study-time");
const longBreakButton = document.querySelector("#long-break");
const tasksInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-tasks");
const listContainer = document.querySelector(".tasks-list");

let timerID;
let isRunning = false;

function addTasks() {
  if (tasksInput.value.trim() === "") return; // Prevent adding empty tasks

  const task = document.createElement("li"); // Create a new list item (LI)
  task.innerText = tasksInput.value; // Set the task text from the input field

  const span = document.createElement("span"); // Create a span for the delete button
  span.innerHTML = "\u00d7"; // Add "×" symbol for delete
  task.appendChild(span); // Append the span to the task

  listContainer.appendChild(task); // Append the task to the task list container
  tasksInput.value = ""; // Clear the input field after adding

  saveData(); // Save the updated list to localStorage
}

// Event listener for handling clicks on the task list
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); // Toggle 'checked' class for tasks
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); // Remove the task if delete button is clicked
      saveData();
    }
  },
  false
);

function startTimer() {
  let [minutes, seconds] = countTime.innerText.split(":").map(Number);

  timerID = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerID);
        startButton.innerText = "Start";
        isRunning = false;
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    countTime.innerText = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, 1000);
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerID);
    startButton.innerText = "Start";
  } else {
    startTimer();
    startButton.innerText = "Stop";
  }

  isRunning = !isRunning;
}

function shortBreak() {
  countTime.innerText = "05:00";
  clearInterval(timerID);
  startButton.innerText = "Start";
  isRunning = false;
}

function studyTime() {
  countTime.innerText = "25:00";
  clearInterval(timerID);
  startButton.innerText = "Start";
  isRunning = false;
}

function longBreak() {
  countTime.innerText = "10:00";
  clearInterval(timerID);
  startButton.innerText = "Start";
  isRunning = false;
}

// Event listeners
startButton.addEventListener("click", toggleTimer);
shortBreakButton.addEventListener("click", shortBreak);
studyTimeButton.addEventListener("click", studyTime);
longBreakButton.addEventListener("click", longBreak);
addTaskButton.addEventListener("click", addTasks);

showTask();
