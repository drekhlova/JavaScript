const workouts = [
  {
    id: "1",
    name_of_workout: "YOGA",
    time_of_workout: "09:30 - 11:00",
    max_number_of_participants: "10",
    current_number_of_participants: "9",
  },
  {
    id: "2",
    name_of_workout: "PILATES",
    time_of_workout: "11:10 - 12:10",
    max_number_of_participants: "20",
    current_number_of_participants: "12",
  },
  {
    id: "3",
    name_of_workout: "Zumba",
    time_of_workout: "12:30 - 13:30",
    max_number_of_participants: "20",
    current_number_of_participants: "16",
  },
];

const scheduleBox = document.querySelector(".schedule-box");

function createScheduleHTML(workoutsInfo) {
  let scheduleHTML = "";
  workoutsInfo.forEach((workout) => {
    scheduleHTML += `<div data-id="${workout.id}">
        <h2>${workout.name_of_workout}</h2>
        <p>${workout.time_of_workout}</p>
        <p>Размер группы: ${workout.max_number_of_participants}</p>
        <p>
          Записано участников:<span>${workout.current_number_of_participants}</span>
        </p>
        <button class="signUpButton" id="${workout.id}">
          Записаться
        </button>
        <button class="deleteButton" data-id="${workout.name_of_workout}">
          Отменить запись
        </button>
      </div>`;
  });
  return scheduleHTML;
}

scheduleBox.innerHTML = createScheduleHTML(workouts);

scheduleBox.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("signUpButton") &&
    !e.target.classList.contains("disabled")
  ) {
    const workoutId = e.target.id;
    const currentWorkout = workouts.find((workout) => workout.id === workoutId);

    if (currentWorkout) {
      currentWorkout.current_number_of_participants++;
      const currentNumberOfParticipants = document.querySelector(
        `[data-id="${workoutId}"]`
      );
      const span = currentNumberOfParticipants.querySelector("span");
      span.textContent = currentWorkout.current_number_of_participants;

      if (
        currentWorkout.current_number_of_participants >=
        currentWorkout.max_number_of_participants
      ) {
        e.target.classList.add("disabled");
      }

      if (
        currentWorkout.current_number_of_participants <
        currentWorkout.max_number_of_participants
      ) {
        e.target.classList.remove("disabled");
      }

      e.target.nextElementSibling.classList.remove("disabled");
    }
  }

  if (e.target.classList.contains("deleteButton")) {
    let currentWorkout = workouts.find(
      (item) => item.name_of_workout === e.target.dataset.id
    );
    if (currentWorkout) {
      currentWorkout.current_number_of_participants--;
      const currentNumberOfParticipants = document.querySelector(
        `[data-id="${currentWorkout.id}"]`
      );
      const span = currentNumberOfParticipants.querySelector("span");
      span.textContent = currentWorkout.current_number_of_participants;

      if (
        currentWorkout.current_number_of_participants <
        currentWorkout.max_number_of_participants
      ) {
        e.target.previousElementSibling.classList.remove("disabled");
      }

      if (currentWorkout.current_number_of_participants <= 0) {
        e.target.classList.add("disabled");
      }
    }
  }
});
