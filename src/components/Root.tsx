import { useEffect, useState } from "react";
import { scan } from "../services/axie";
import { DataGrid, GridCellParams } from "@material-ui/data-grid";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import { parse, stringify } from "query-string";

export function Root() {
  const [rows, setRows] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState("");
  const [eyeList, setEyeList] = useState(new Set<string>());
  const [earList, setEarList] = useState(new Set<string>());
  const [backList, setBackList] = useState(new Set<string>());
  const [mouthList, setMouthList] = useState(new Set<string>());
  const [hornList, setHornList] = useState(new Set<string>());
  const [tailList, setTailList] = useState(new Set<string>());
  const [eyeListClass, setEyeListClass] = useState(new Set<string>());
  const [earListClass, setEarListClass] = useState(new Set<string>());
  const [backListClass, setBackListClass] = useState(new Set<string>());
  const [mouthListClass, setMouthListClass] = useState(new Set<string>());
  const [hornListClass, setHornListClass] = useState(new Set<string>());
  const [tailListClass, setTailListClass] = useState(new Set<string>());

  const parsedHash = parse(location.hash);

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

      const eyeListClassTmp = new Set<string>();
      const earListClassTmp = new Set<string>();
      const backListClassTmp = new Set<string>();
      const mouthListClassTmp = new Set<string>();
      const hornListClassTmp = new Set<string>();
      const tailListClassTmp = new Set<string>();

      rows.forEach((item) => {
        tmp[item.id] = item;
        eyeListTmp.add(item.eye1).add(item.eye2).add(item.eye3);
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        backListTmp.add(item.back1).add(item.back2).add(item.back3);
        mouthListTmp.add(item.mouth1).add(item.mouth2).add(item.mouth3);
        hornListTmp.add(item.horn1).add(item.horn2).add(item.horn3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);

        eyeListClassTmp
          .add(item.eye1class)
          .add(item.eye2class)
          .add(item.eye3class);
        earListClassTmp
          .add(item.ear1class)
          .add(item.ear2class)
          .add(item.ear3class);
        backListClassTmp
          .add(item.back1class)
          .add(item.back2class)
          .add(item.back3class);
        mouthListClassTmp
          .add(item.mouth1class)
          .add(item.mouth2class)
          .add(item.mouth3class);
        hornListClassTmp
          .add(item.horn1class)
          .add(item.horn2class)
          .add(item.horn3class);
        tailListClassTmp
          .add(item.tail1class)
          .add(item.tail2class)
          .add(item.tail3class);
      });

      data?.Items.forEach((item: any) => {
        tmp[item.id] = item;
        eyeListTmp.add(item.eye1).add(item.eye2).add(item.eye3);
        earListTmp.add(item.ear1).add(item.ear2).add(item.ear3);
        backListTmp.add(item.back1).add(item.back2).add(item.back3);
        mouthListTmp.add(item.mouth1).add(item.mouth2).add(item.mouth3);
        hornListTmp.add(item.horn1).add(item.horn2).add(item.horn3);
        tailListTmp.add(item.tail1).add(item.tail2).add(item.tail3);

        eyeListClassTmp
          .add(item.eye1class)
          .add(item.eye2class)
          .add(item.eye3class);
        earListClassTmp
          .add(item.ear1class)
          .add(item.ear2class)
          .add(item.ear3class);
        backListClassTmp
          .add(item.back1class)
          .add(item.back2class)
          .add(item.back3class);
        mouthListClassTmp
          .add(item.mouth1class)
          .add(item.mouth2class)
          .add(item.mouth3class);
        hornListClassTmp
          .add(item.horn1class)
          .add(item.horn2class)
          .add(item.horn3class);
        tailListClassTmp
          .add(item.tail1class)
          .add(item.tail2class)
          .add(item.tail3class);
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

      setEyeListClass(eyeListClassTmp);
      setEarListClass(earListClassTmp);
      setBackListClass(backListClassTmp);
      setMouthListClass(mouthListClassTmp);
      setHornListClass(hornListClassTmp);
      setTailListClass(tailListClassTmp);
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
    eye: parsedHash.eye ? String(parsedHash.eye) : "",
    ear: parsedHash.ear ? String(parsedHash.ear) : "",
    back: parsedHash.back ? String(parsedHash.back) : "",
    mouth: parsedHash.mouth ? String(parsedHash.mouth) : "",
    horn: parsedHash.horn ? String(parsedHash.horn) : "",
    tail: parsedHash.tail ? String(parsedHash.tail) : "",
    eyeClass: parsedHash.eyeClass ? String(parsedHash.eyeClass) : "",
    earClass: parsedHash.earClass ? String(parsedHash.earClass) : "",
    backClass: parsedHash.backClass ? String(parsedHash.backClass) : "",
    mouthClass: parsedHash.mouthClass ? String(parsedHash.mouthClass) : "",
    hornClass: parsedHash.hornClass ? String(parsedHash.hornClass) : "",
    tailClass: parsedHash.tailClass ? String(parsedHash.tailClass) : "",
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

    const newHash = parse(location.hash);
    if (event.target.value) {
      newHash[event.target.name] = event.target.value;
    } else {
      newHash[event.target.name] = undefined;
    }
    location.hash = stringify(newHash);
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

    const eyeClass = state.eyeClass
      ? [row.eye1class, row.eye2class, row.eye3class].includes(state.eyeClass)
      : true;
    const earClass = state.earClass
      ? [row.ear1class, row.ear2class, row.ear3class].includes(state.earClass)
      : true;
    const backClass = state.backClass
      ? [row.back1class, row.back2class, row.back3class].includes(
          state.backClass
        )
      : true;
    const mouthClass = state.mouthClass
      ? [row.mouth1class, row.mouth2class, row.mouth3class].includes(
          state.mouthClass
        )
      : true;
    const hornClass = state.hornClass
      ? [row.horn1class, row.horn2class, row.horn3class].includes(
          state.hornClass
        )
      : true;
    const tailClass = state.tailClass
      ? [row.tail1class, row.tail2class, row.tail3class].includes(
          state.tailClass
        )
      : true;

    return (
      eye &&
      ear &&
      back &&
      mouth &&
      horn &&
      tail &&
      eyeClass &&
      earClass &&
      backClass &&
      mouthClass &&
      hornClass &&
      tailClass
    );
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

    const eyeClassScore = state.eyeClass
      ? scoreMap([row.eye1class, row.eye2class, row.eye3class], state.eyeClass)
      : 0;
    const earClassScore = state.earClass
      ? scoreMap([row.ear1class, row.ear2class, row.ear3class], state.earClass)
      : 0;
    const backClassScore = state.backClass
      ? scoreMap(
          [row.back1class, row.back2class, row.back3class],
          state.backClass
        )
      : 0;
    const mouthClassScore = state.mouthClass
      ? scoreMap(
          [row.mouth1class, row.mouth2class, row.mouth3class],
          state.mouthClass
        )
      : 0;
    const hornClassScore = state.hornClass
      ? scoreMap(
          [row.horn1class, row.horn2class, row.horn3class],
          state.hornClass
        )
      : 0;
    const tailClassScore = state.tailClass
      ? scoreMap(
          [row.tail1class, row.tail2class, row.tail3class],
          state.tailClass
        )
      : 0;

    const totalScore =
      eyeScore +
      earScore +
      backScore +
      mouthScore +
      hornScore +
      tailScore +
      eyeClassScore +
      earClassScore +
      backClassScore +
      mouthClassScore +
      hornClassScore +
      tailClassScore;

    return {
      ...row,
      id: Number(row.id),
      price: Number(row.price),
      eyeScore: eyeScore + eyeClassScore,
      earScore: earScore + earClassScore,
      backScore: backScore + backClassScore,
      mouthScore: mouthScore + mouthClassScore,
      hornScore: hornScore + hornClassScore,
      tailScore: tailScore + tailClassScore,
      totalScore,
    };
  });

  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormControl fullWidth={true}>
          <InputLabel>Eye Class</InputLabel>
          <Select
            name="eyeClass"
            value={state.eyeClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...eyeListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Ear Class</InputLabel>
          <Select
            name="earClass"
            value={state.earClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...earListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Back Class</InputLabel>
          <Select
            name="backClass"
            value={state.backClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...backListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Mouth Class</InputLabel>
          <Select
            name="mouthClass"
            value={state.mouthClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...mouthListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Horn Class</InputLabel>
          <Select
            name="hornClass"
            value={state.hornClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...hornListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel>Tail Class</InputLabel>
          <Select
            name="tailClass"
            value={state.tailClass}
            onChange={handleChange}
          >
            <MenuItem value={""}>&nbsp;</MenuItem>
            {[...tailListClass].sort().map((x) => (
              <MenuItem value={x} key={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ display: "flex" }}>
        <FormControl fullWidth={true}>
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
        <FormControl fullWidth={true}>
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
        <FormControl fullWidth={true}>
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
        <FormControl fullWidth={true}>
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
        <FormControl fullWidth={true}>
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
        <FormControl fullWidth={true}>
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
      </div>

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
