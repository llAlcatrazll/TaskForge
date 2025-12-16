type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function ToDolist_Sidebar({ activePage, setActivePage }: Props) {
  return (
    <div className="flex flex-col">
      <button onClick={() => setActivePage("to-do-list:calendar")}>
        Calendar
      </button>
      <button onClick={() => setActivePage("to-do-list:tasks")}>Tasks</button>
      <button onClick={() => setActivePage("to-do-list:notes")}>Notes</button>
    </div>
  );
}
