import { useEffect, useState } from "react";
import { scan } from "../services/axie";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export function Root() {
  const [rows, setRows] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState("");
  const [eyeList, setEyeList] = useState(new Set<string>());
  const [earList, setEarList] = useState(new Set<string>());
  const [backList, setBackList] = useState(new Set<string>());
  const [mouthList, setMouthList] = useState(new Set<string>());
  const [hornList, setHornList] = useState(new Set<string>());
  const [tailList, setTailList] = useState(new Set<string>());

  useEffect(() => {
    console.log("scan", lastEvaluatedKey);

    scan(lastEvaluatedKey).then((data) => {
      const tmp = {};
      const eyeListTmp = new Set<string>();
      const earListTmp = new Set<string>();
      const backListTmp = new Set<string>();
      const mouthListTmp = new Set<string>();
      const hornListTmp = new Set<string>();
      const tailListTmp = new Set<string>();

      rows.forEach((item) => {
        tmp[item.id] = item;
        eyeListTmp.add(item.eye1).add(item.eye2).add(item.eye3);
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        backListTmp.add(item.back1).add(item.back2).add(item.back3);
        mouthListTmp.add(item.mouth1).add(item.mouth2).add(item.mouth3);
        hornListTmp.add(item.horn1).add(item.horn2).add(item.horn3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);
      });

      data?.Items.forEach((item: any) => {
        tmp[item.id] = item;
        eyeListTmp.add(item.eye1).add(item.eye2).add(item.eye3);
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        backListTmp.add(item.back1).add(item.back2).add(item.back3);
        mouthListTmp.add(item.mouth1).add(item.mouth2).add(item.mouth3);
        hornListTmp.add(item.horn1).add(item.horn2).add(item.horn3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);
      });

      const rowsTmp = [];
      Object.values(tmp).forEach((value) => rowsTmp.push(value));
      setRows(rowsTmp);

      if (data?.LastEvaluatedKey) {
        setLastEvaluatedKey(data.LastEvaluatedKey.id);
      }

      setEyeList(eyeListTmp);
      setEarList(earListTmp);
      setBackList(backListTmp);
      setMouthList(mouthListTmp);
      setHornList(hornListTmp);
      setTailList(tailListTmp);
    });
  }, [lastEvaluatedKey]);

  console.log(rows.length);

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
      field: "eyeScore",
      headerName: "Eye",
      flex: 1,
    },
    {
      field: "earScore",
      headerName: "Ear",
      flex: 1,
    },
    {
      field: "backScore",
      headerName: "Back",
      flex: 1,
    },
    {
      field: "mouthScore",
      headerName: "Mouth",
      flex: 1,
    },
    {
      field: "hornScore",
      headerName: "Horn",
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
    eye: "",
    ear: "",
    back: "",
    mouth: "",
    horn: "",
    tail: "",
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const myFilter = (row: any) => {
    const eye = state.eye
      ? [row.eye1, row.eye2, row.eye3].includes(state.eye)
      : true;
    const ear = state.ear
      ? [row.ear1, row.ear2, row.ear3].includes(state.ear)
      : true;
    const back = state.back
      ? [row.back1, row.back2, row.back3].includes(state.back)
      : true;
    const mouth = state.mouth
      ? [row.mouth1, row.mouth2, row.mouth3].includes(state.mouth)
      : true;
    const horn = state.horn
      ? [row.horn1, row.horn2, row.horn3].includes(state.horn)
      : true;
    const tail = state.tail
      ? [row.tail1, row.tail2, row.tail3].includes(state.tail)
      : true;

    return eye && ear && back && mouth && horn && tail;
  };

  const rowsFiltered = rows.filter(myFilter);
  const scoreMap = (checkParts: string[], origPart: string) => {
    let score = 0;

    checkParts.forEach((part, i) => {
      if (part === origPart) {
        switch (i) {
          case 0:
            score += 37.5;
            break;
          case 1:
            score += 9.375;
            break;
          case 2:
            score += 3.125;
            break;
        }
      }
    });

    return score;
  };
  const rowsFormatted = rowsFiltered.map((row) => {
    const eyeScore = state.eye
      ? scoreMap([row.eye1, row.eye2, row.eye3], state.eye)
      : 0;
    const earScore = state.ear
      ? scoreMap([row.ear1, row.ear2, row.ear3], state.ear)
      : 0;
    const backScore = state.back
      ? scoreMap([row.back1, row.back2, row.back3], state.back)
      : 0;
    const mouthScore = state.mouth
      ? scoreMap([row.mouth1, row.mouth2, row.mouth3], state.mouth)
      : 0;
    const hornScore = state.horn
      ? scoreMap([row.horn1, row.horn2, row.horn3], state.horn)
      : 0;
    const tailScore = state.tail
      ? scoreMap([row.tail1, row.tail2, row.tail3], state.tail)
      : 0;

    const totalScore =
      eyeScore + earScore + backScore + mouthScore + hornScore + tailScore;

    return {
      ...row,
      id: Number(row.id),
      price: Number(row.price),
      eyeScore,
      earScore,
      backScore,
      mouthScore,
      hornScore,
      tailScore,
      totalScore,
    };
  });

  return (
    <div>
      <FormControl>
        <InputLabel>Eye</InputLabel>
        <Select name="eye" value={state.eye} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...eyeList].sort().map((x) => (
            <MenuItem value={x} key={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        <InputLabel>Back</InputLabel>
        <Select name="back" value={state.back} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...backList].sort().map((x) => (
            <MenuItem value={x} key={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Mouth</InputLabel>
        <Select name="mouth" value={state.mouth} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...mouthList].sort().map((x) => (
            <MenuItem value={x} key={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Horn</InputLabel>
        <Select name="horn" value={state.horn} onChange={handleChange}>
          <MenuItem value={""}>&nbsp;</MenuItem>
          {[...hornList].sort().map((x) => (
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
