import React, {useState, useRef, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';



let keys = ['Snacks', 'Office Supplies', 'Personal Care', 'Baby Food', 'Household', 'Cosmetics', 'Meat', 'Vegetables', 'Beverages', 'Fruits', 'Clothes', 'Cereal']
let labels = ['Region', 'Country', 'Item Type', 'Fiscal Year', 'Sales Channel', 'Order Priority', 'Order Date', 'Order ID', 'Ship Date', 'Units Sold', 'Unit Price', 'Unit Cost', 'Total Revenue', 'Total Cost', 'Total Profit']
const columns = []
for(let i = 0; i < labels.length; i++){
    columns.push({id: labels[i], label: labels[i]})
}

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

function DragNDrop({data, alldata}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, updateRow] = useState([]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const [list, setList] = useState(data); 
    const [dragging, setDragging] = useState(false);
    const [list_item, setListItem] = useState([]);
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    useEffect(() => {
        list_item.map((group, id) =>
        {
            if(group.title === 'pool'){
                let temp_list1 = []
                let temp_list2 = []
                for(let i = 0; i < group.items.length; i++){
                    if (keys.includes(group.items[i])){
                        temp_list2.push(group.items[i])
                    } else {
                        temp_list1.push(group.items[i])
                    }
                    setList1(temp_list1)
                    setList2(temp_list2)
                }
            }
        })

    }, [list_item])
    function createData(l) {
        console.log(l)
        let Region =l[0]
        let Country=l[1]
        let ItemType=l[2]
        let FiscalYear=l[3]
        let SalesChannel=l[4]
        let OrderPriority=l[5]
        let OrderDate=l[6]
        let OrderID=l[7]
        let ShipDate=l[8]
        let UnitsSold=l[9]
        let UnitPrice=l[10]
        let UnitCost=l[11]
        let TotalRevenue=l[12]
        let TotalCost=l[13]
        let TotalProfit=l[14]
        return {Region, Country, ItemType, FiscalYear, SalesChannel, OrderPriority, OrderDate, OrderID, ShipDate, UnitsSold, UnitPrice, UnitCost, TotalRevenue, TotalCost, TotalProfit}
    }
    useEffect(() => {
        console.log(list1)
        console.log(list2)
        if(typeof(alldata.result) != 'undefined'){
            let temp_row = []
            for(let i = 0; i < list1.length; i++){
                for(let j = 0; j < list2.length; j++){
                    for(let x = 0; x < alldata.result[list1[i]][list2[j]].length; x++){
                        temp_row.push(createData(alldata.result[list1[i]][list2[j]][x]))
                    }
                }
            }
            updateRow(temp_row)
        }
    }, [alldata, list1, list2])

    const item_track = useRef();
    const dragged_item = useRef();
    
    const handletDragStart = (e, item) => {
        dragged_item.current = e.target;
        dragged_item.current.addEventListener('dragend', handleDragEnd)
        item_track.current = item;
        setDragging(true);
        setTimeout(() => {
            setDragging(true); 
        },0)
    }
    const handleDragEnter = (e, item_hold) => {
        if (dragged_item.current !== e.target) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                let current_group = item_track.current.gid
                let current_item_id = item_track.current.id
                let old_group = item_hold.gid
                let old_item_id = item_hold.id

                let popped_value = newList[current_group].items.splice(current_item_id,1)[0]
                newList[old_group].items.splice(old_item_id, 0, popped_value)
                item_track.current = item_hold;
                setListItem(newList)
                return newList
            })
        }
    }
    const handleDragEnd = (e) => {
        setDragging(false);
        item_track.current = null;
        dragged_item.current.removeEventListener('dragend', handleDragEnd)
        dragged_item.current = null;
    }
    const getStyles = (item) => {
        if (item_track.current.gid === item.gid && item_track.current.id === item.id) {
            return "dnd-item current"
        }
        return "dnd-item"
    }
    if (list) {
        return (
            <div style = {{height:'100%'}}>
                <div style = {{height:'50%', margin:'20px'}}>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.TotalProfit}>
                                    <TableCell align="center">{row.Region}</TableCell>
                                    <TableCell align="center">{row.Country}</TableCell>
                                    <TableCell align="center">{row.ItemType}</TableCell>
                                    <TableCell align="center">{row.FiscalYear}</TableCell>
                                    <TableCell align="center">{row.SalesChannel}</TableCell>
                                    <TableCell align="center">{row.OrderPriority}</TableCell>
                                    <TableCell align="center">{row.OrderDate}</TableCell>
                                    <TableCell align="center">{row.OrderID}</TableCell>
                                    <TableCell align="center">{row.ShipDate}</TableCell>
                                    <TableCell align="center">{row.UnitsSold}</TableCell>
                                    <TableCell align="center">{row.UnitPrice}</TableCell>
                                    <TableCell align="center">{row.UnitCost}</TableCell>
                                    <TableCell align="center">{row.TotalRevenue}</TableCell>
                                    <TableCell align="center">{row.TotalCost}</TableCell>
                                    <TableCell align="center">{row.TotalProfit}</TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
                <div className="drag-n-drop" >
                {list.map((group, gid) => (
                <div 
                    key={group.title} 
                    onDragEnter={dragging && !group.items.length?(e) => handleDragEnter(e,{gid, id: 0}):null} 
                    className="dnd-group">
                    {group.items.map((item, id) => (
                    <div 
                    style = {{background: keys.includes(item)? 'rgb(145, 195, 236)':'rgb(182, 236, 145)'}}
                    draggable 
                    key={item}  
                    onDragStart={(e) => handletDragStart(e, {gid, id})} 
                    onDragEnter={dragging?(e) => {handleDragEnter(e, {gid, id})}:null} 
                    className={dragging?getStyles({gid, id}):"dnd-item"}>
                    {item}
                    </div>
                    ))}
                </div>
                ))}
                </div>
            </div>
        )
    } else { return null}

}

export default DragNDrop;