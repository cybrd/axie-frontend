export function scan(id: string = "") {
  return fetch(API + "/scan/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  }).then((res) => res.json());
}
