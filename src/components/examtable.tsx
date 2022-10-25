import * as React from "react";
import "../App.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {AiFillDelete} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"; 
import Button from "@mui/material/Button"; 
import { doesNotMatch } from "assert";
import { fabClasses } from "@mui/material";


interface Result {
    name:string,
    score:number,
    grade:string
}

function deleteData(resultsArr:any, deletedResult:any){
    return resultsArr.filter((r:any) => r !== deletedResult)
}

export default function ExamTable() {
    const [results, setResults] = React.useState<Result[]>([
        {name:"Alan", score:70, grade:"A"},
        {name:"Ben", score:90, grade:"B"},
        {name:"Cath", score:80, grade:"C"},
    ]);
    const [newName, setNewName] = React.useState<string>("")
    const [newScore, setNewScore] = React.useState<number>(0)
    const [newGrade, setNewGrade] = React.useState<string>("")
    const [upperLimit, setUpperLimit] = React.useState<number>(1);
    const [lowerLimit, setLowerLimit] = React.useState<number>(0);
    const [gradeFilters, setGradeFilters] = React.useState<string[]>([])
    const [filter, setFilter] = React.useState<boolean>(false)
    const [filteredResults, setFilteredResults] = React.useState<Result[]>([])
    const [disableCreate, setDisableCreate] = React.useState<boolean>(true)

    function addNewResult(result:Result) {
        setResults(current=>[...current,result])
    }
    React.useEffect(()=>{
        if (newName !== "" && newGrade !==""){
            setDisableCreate(false)
        } else{
            setDisableCreate(true)
        }
        console.log(newName)
    },[newName, newGrade])
    function handleGradeFilter(event:any){
        if(event.target.checked){
            setGradeFilters(current=>[...current, event.target.value])
        } else{
            setGradeFilters(gradeFilters.filter(grade=>grade!==event.target.value))
        }
    }

    function filterScores(upperLimit:number, lowerLimit:number, grade:string[]){
        setFilteredResults(results.filter(result=>result.score<=upperLimit && result.score>=lowerLimit && gradeFilters.includes(result.grade)))
    }
  return (
    <div className="desktop-container">
      <div className="desktop-new-record">
        <div className="desktop-new-record-inputs">
          <TextField
          className="student-name"
            id="student-name"
            label="Student Name"
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          ></TextField>
          <TextField
            id="student-score"
            label="Score"
            value={newScore}
            onChange={(e) => setNewScore(parseInt(e.target.value))}
            InputProps={{ inputProps: { max: 100, min: 0 } }}
            type="number"
          />
          <Select
            id="student-class"
            value={newGrade}
            label="Grade"
            style={{ width: "5em" }}
            onChange={(e) => setNewGrade(e.target.value)}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </Select>
        </div>
        <div>
          <Button
            variant="contained"
            disabled={disableCreate}
            onClick={() => {
              addNewResult({ name: newName, score: newScore, grade: newGrade });
            }}
          >
            Create Record
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Table sx={{ minWidth: 250, maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!filter
              ? results.map((result) => (
                  <TableRow
                    key={result.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {result.name}
                    </TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.grade}</TableCell>
                    <TableCell>
                      <AiFillDelete
                        onClick={() => {
                          setResults(deleteData(results, result));
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : filteredResults.map((result) => (
                  <TableRow
                    key={result.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {result.name}
                    </TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.grade}</TableCell>
                    <TableCell>
                      <AiFillDelete
                        onClick={() => {
                          setResults(deleteData(results, result));
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="desktop-filter">
        <div style={{ display: "flex", gap:"1em" }}>
          <span>Score</span>
          <TextField
            value={lowerLimit}
            InputProps={{ inputProps: { max: 99, min: 0 } }}
            type="number"
            label="from"
            onChange={(e) => setLowerLimit(parseInt(e.target.value))}
          />
          <TextField
            value={upperLimit}
            InputProps={{ inputProps: { max: 100, min: 1 } }}
            label="to"
            type="number"
            onChange={(e) => setUpperLimit(parseInt(e.target.value))}
          />
        </div>
        <div className="filter-grades">
          <div>
            <input
              id="grade-a"
              type="checkbox"
              value={"A"}
              onChange={handleGradeFilter}
            ></input>
            A
          </div>
          <div>
            <input
              id="grade-b"
              type="checkbox"
              value={"B"}
              onChange={handleGradeFilter}
            ></input>
            B
          </div>
          <div>
            <input
              id="grade-c"
              type="checkbox"
              value={"C"}
              onChange={handleGradeFilter}
            ></input>
            C
          </div>
        </div>

        <Button
          variant="contained"
          onClick={() => {
            filterScores(upperLimit, lowerLimit, gradeFilters);
            setFilter(true);
          }}
        >
          Filter
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            setFilter(false);
            setFilteredResults([]);
          }}
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
}
