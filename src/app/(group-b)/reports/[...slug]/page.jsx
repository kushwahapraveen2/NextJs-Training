
"use client"
import { useParams } from "next/navigation";

export default function BlogCatchAllPage() {
  const params = useParams(); 

  return (
    <div>
      <h1>Catch All Route</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
