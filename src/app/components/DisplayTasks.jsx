"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import { IoMdCheckboxOutline } from "react-icons/io";
import DisplayBonusTasks from "./DisplayBonusTasks.jsx";

export default function DisplayTasks({ user, userId, pet, tasks }) {
  const [taskList, setTaskList] = useState([]);
  const [bonusList, setBonusList] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  // useEffect(() => {
  //   console.log(taskList);
  // }, [userId, petId]);

  useEffect(() => {
    const bonusTasks = tasks.filter((task) => task.isBonus === true);
    setBonusList(bonusTasks);
  }, [tasks]);

  const handleTaskCompletion = (task) => {
    setCompletedTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <>
      <div className={styles.taskMainContainer}>
        <p className={styles.taskPageTitle}>Tasks</p>
        <div className={styles.taskContainer}>
          <div className={styles.taskTitlesContainer}>
            <p className={styles.bonusTitle}>Daily Tasks</p>
            <p className={styles.bonusTitle}>Bonus Task!</p>
          </div>
          {tasks.map((task) => (
            <div
              className={`${styles.tasksUserContainer} ${
                completedTasks.includes(task) ? styles.completedTask : ""
              }`}
              key={task.id}
            >
              <div className={styles.dailyTaskContainer}>
                <IoMdCheckboxOutline
                  className={styles.taskCheckbox}
                  onChange={() => handleTaskCompletion(task)}
                  disabled={completedTasks.includes(task)}
                />
                <p className={styles.taskCategoryTitle}>{task.category}:</p>
                <p
                  className={`${styles.taskName} ${
                    completedTasks.includes(task) ? styles.strikeThrough : ""
                  }`}
                >
                  {task.name}
                </p>
                <p
                  className={`${styles.taskName} ${
                    completedTasks.includes(task) ? styles.strikeThrough : ""
                  }`}
                >
                  <span className={styles.dueDate}>Due:</span>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div className={styles.bonusTaskContainer}>
                <IoMdCheckboxOutline
                  className={styles.taskCheckbox}
                  onChange={() => handleTaskCompletion(task)}
                  disabled={completedTasks.includes(task)}
                />
                <p
                  className={`${styles.taskName} ${
                    completedTasks.includes(task) ? styles.strikeThrough : ""
                  }`}
                ></p>
              </div>
            </div>
          ))}
        </div>
        {bonusList &&
          bonusList.map((bonusTask) => (
            <DisplayBonusTasks key={bonusTask.id} task={bonusTask} pet={pet} />
          ))}
      </div>
    </>
  );
}
