"use client"
import { useParams } from "next/navigation";

export default function BlogOptionalCatchAllPage() {
  const params = useParams(); // { slug: undefined } or array

  return (
    <div>
      <h1>Optional Catch All Route</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
