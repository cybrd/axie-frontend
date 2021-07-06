import { useEffect, useState } from "react";
import { scan } from "../services/axie";

export function Root() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    scan()
      .then((data) => {
        setData(data);
      })
      .catch(() => setError("Failed to load"));
  }, []);

  return <>{data && Object.keys(data.Items).length}</>;
}
