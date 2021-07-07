import { useEffect, useState } from "react";
import { scan } from "../services/axie";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export function Root() {
  const [rows, setRows] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState("");
  const [earList, setEarList] = useState(new Set<string>());
  const [tailList, setTailList] = useState(new Set<string>());

  useEffect(() => {
    console.log("scan", lastEvaluatedKey);

    scan(lastEvaluatedKey).then((data) => {
      const tmp = {};
      const earListTmp = new Set<string>();
      const tailListTmp = new Set<string>();
      rows.forEach((item) => {
        tmp[item.id] = item;
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);
      });

      data?.Items.forEach((item: any) => {
        tmp[item.id] = item;
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);
      });

      const rowsTmp = [];
      Object.values(tmp).forEach((value) => rowsTmp.push(value));
      setRows(rowsTmp);
      setLastEvaluatedKey(data?.LastEvaluatedKey.id);

      setEarList(earListTmp);
      setTailList(tailListTmp);
    });
  }, [lastEvaluatedKey]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <a href={`https://marketplace.axieinfinity.com/axie/${params.value}`}>
          {params.value}
        </a>
      ),
    },
    {
      field: "earScore",
      headerName: "Ear",
      flex: 1,
    },
    {
      field: "tailScore",
      headerName: "Tail",
      flex: 1,
    },
    {
      field: "totalScore",
      headerName: "Total",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
  ];

  const [state, setState] = useState({
    ear: "",
    tail: "",
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const myFilter = (row: any) => {
    const ear = state.ear
      ? [row.ear1, row.ear2, row.ear3].includes(state.ear)
      : true;
    const tail = state.tail
      ? [row.tail1, row.tail2, row.tail3].includes(state.tail)
      : true;

    return ear && tail;
  };

  const rowsFiltered = rows.filter(myFilter);
  const scoreMap = (num: number) => {
    switch (num) {
      case -1:
        return 0;
      case 0:
        return 37.5;
      case 1:
        return 9.375;
      case 2:
        return 3.125;
    }
  };
  const rowsFormatted = rowsFiltered.map((row) => {
    const earScore = state.ear
      ? scoreMap([row.ear1, row.ear2, row.ear3].indexOf(state.ear))
      : 0;
    const tailScore = state.tail
      ? scoreMap([row.tail1, row.tail2, row.tail3].indexOf(state.tail))
      : 0;

    const totalScore = earScore + tailScore;

    return {
      ...row,
      id: Number(row.id),
      price: Number(row.price),
      earScore,
      tailScore,
      totalScore,
    };
  });

  return (
    <div>
      <FormControl>
        <InputLabel>Ear</InputLabel>
        <Select name="ear" value={state.ear} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...earList].sort().map((x) => (
            <MenuItem value={x} key={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Tail</InputLabel>
        <Select name="tail" value={state.tail} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...tailList].sort().map((x) => (
            <MenuItem value={x} key={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={rowsFormatted}
          columns={columns}
          pageSize={10}
          disableColumnMenu
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
