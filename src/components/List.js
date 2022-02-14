import React from "react";
import ListItem from "./ListItem";

export default function List() {
  return (
    <div className="mt-8 p-4 max-w-md mx-auto bg-slate-200 rounded-lg shadow-sm shadow-red-200">
      <ListItem imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" name="Ted Fox" email="ted.fox@example.com" />
      <ListItem imageUrl="https://tailwindcss.com/img/erin-lindford.jpg" name="Kristen Ramos" email="kristen.ramos@example.com" />
      <ListItem imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" name="Anna Ramos" email="Anna.ramos@example.com" />
    </div>
  );
}
