import React from "react";

const datafetch = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
};

export const metadata = {
  title: "User Details",
  description: "A list of users fetched from API",
};

export default async function Page() {
  const data = await datafetch();

  return (
    <>
      <h1>User List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
