// import { useState } from "react";

import ToDolist_Calendar from "../subcomponents/ToDolist_Calendar";
import ToDolist_Notes from "../subcomponents/ToDolist_Notes";
import ToDolist_Tasks from "../subcomponents/ToDolist_Tasks";

type Props = {
  activePage: string;
};

export default function ToDolist({ activePage }: Props) {
  switch (activePage) {
    case "to-do-list:calendar":
      return <ToDolist_Calendar />;
    case "to-do-list:tasks":
      return <ToDolist_Tasks />;
    case "to-do-list:notes":
      return <ToDolist_Notes />;
    default:
      return <ToDolist_Calendar />;
  }
}
