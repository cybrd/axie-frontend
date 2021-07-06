export function scan(id: string = "") {
  return fetch(API + "/scan", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  }).then((res) => res.json());
}
