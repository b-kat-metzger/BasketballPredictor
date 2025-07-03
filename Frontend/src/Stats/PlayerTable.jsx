import './PlayerTable.css'
import { useState, useEffect } from "react"
import {fetchPlayers} from './getPlayers'
import NorthIcon from '@mui/icons-material/North';
import Paper from '@mui/material/Paper'
import Popover from "@mui/material/Popover";
import SouthIcon from '@mui/icons-material/South'
import Table from "@mui/material/Table";
import TableBody  from "@mui/material/TableBody";
import TableCell  from "@mui/material/TableCell";
import TableContainer  from "@mui/material/TableContainer";
import TableHead  from "@mui/material/TableHead";
import TablePagination  from "@mui/material/TablePagination";
import TableRow  from "@mui/material/TableRow";
import Typography  from '@mui/material/Typography';

const columns = [
    {id:'FULL_NAME', label:'Name', minWidth:120},
    {id:'TEAM_ABBREVIATION', label:'Team', minWidth:20},
    {id:'PLAYER_AGE', label:'Age',minWidth:20},
    {id:'MIN', label:'Mins', minWidth:40},
    {id:'PPG', label:'PPG', minWidth:60, hover:["PTS"]},
    {id:'APG', label:'APG', minWidth:60, hover:["AST"]},
    {id:'FG_PCT', label:'FG%', minWidth:60, hover:["FGM", "FGA"]},
    {id:'FG3_PCT', label:'3P%', minWidth:60, hover:["FG3M", "FG3A"]},
    {id:'FT_PCT', label:'FT%', minWidth:60, hover:["FTM", "FTA"]},
    {id:'REB', label:'REB', minWidth:60, hover:["OREB", "DREB"]},
    {id:'STL', label:'STL', minWidth:60},
    {id:'BLK', label:'BLK', minWidth:40},
    {id:'TOV', label:'TOV', minWidth:60},
    {id:'PF', label:'PF', minWidth:40},
    {id:'PER', label:'PER', minWidth:60},
    {id:'FP', label:'FP', minWidth:60}
    ]

export default function PlayerTable() {
    const [popoverText, setPopoverText] = useState("");
    const [players, setPlayers] = useState([]);
    const [pages, setPages] = useState(0);
    const [limit,setLimit] = useState(10);
    const [sortBy, setSortBy] = useState("PPG");
    const [order, setOrder] = useState("desc")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(()=>{
        let ignore = false;
        async function getPlayers(){
            const json = await fetchPlayers(1,568,sortBy, order);
            if(!ignore){
                setPlayers(json);
            }
        }
        getPlayers();

        return ()=>{
            ignore = true;
        };
    },[order, sortBy])

    function handlePopoverOpen(e,column, row){
        if(e.target.id.includes("hasPopup")){
            setPopoverText(()=>{
                let result = ""
                column.hover.map((attribute)=>
                    result += String(`${attribute}: ${row[attribute]} `)
                )
                return result;
            })
            setAnchorEl(e.target);
        }
    }

    function handlePopoverClose(e){
        
        setAnchorEl(null);
        
    }

    function handleChangeSort(e, id){
        e.preventDefault();
        if(sortBy===id){
            setOrder(prev=>(prev==='asc' ? 'desc' : 'asc'))
            setPages(0)
        }
        else{
            setSortBy(id);
            setOrder("desc")
            setPages(0)
        }
    }

    function handleChangePage(e, newPage){
        e.preventDefault();
        setPages(newPage)
    }
    
    function handleChangeRowsPerPage(e){
        e.preventDefault();
        setLimit(+e.target.value);
        setPages(0)
    }

  return (
    <Paper sx={{width:'100%',overflow:'hidden'}}>
        <TableContainer sx={{maxHeight:600}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column)=>{
                            return (
                            <TableCell
                            id={`${column.id} table-key`}
                            key={column.id}
                            style={{minWidth: column.minWidth, padding:'8px', cursor:'pointer'}}
                            align="left"
                            onClick={(e)=>handleChangeSort(e,column.id)}
                            >
                                {column.label}
                                {sortBy === column.id &&(
                                    order == 'asc' ? <NorthIcon sx={{fontSize:20}}/> : <SouthIcon sx={{fontSize:20}}/>
                                )
                                }
                              
                            </TableCell>
                        )})}
                    </TableRow>
                    
                </TableHead>
                <TableBody>
                    {players
                    .slice(pages * limit, pages*limit + limit)
                    .map((row)=>{
                        return(
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column)=>{
                                    const value = row[column.id];
                                    return(
                                        <TableCell id={`${(column.hover!=null ? "hasPopup":0)}`} key={`${row['id']}-${column.id}`} align="left"
                                        aria-describedby={open ? 'table-head-popover': undefined}
                                        onMouseEnter={(e)=>handlePopoverOpen(e,column,row)}
                                        onMouseLeave={handlePopoverClose}>
                                            {value}
                                             <Popover
                                            id='table-head-popover'
                                            sx={{pointerEvents:'none', display:'flex', flexDirection:'column'}}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                                            transformOrigin={{vertical:'top', horizontal:'left'}}
                                            disableRestoreFocus
                                            > 
                                                <Typography sx={{p:0.5}}>{popoverText}</Typography>
                                            </Popover>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination 
        rowsPerPageOptions={[10,25,50]}
        component="div"
        count={players.length}
        rowsPerPage={limit}
        page={pages}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
         </Paper>
  );
}
