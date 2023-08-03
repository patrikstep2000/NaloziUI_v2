import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TableHeadCell } from "@/app/model/DataTable";

const EnhancedHead: React.FC<{ headCells: TableHeadCell[], removable?:boolean }> = ({
    headCells,
    removable
  }) => {
    return (
        <TableHead>
          <TableRow>
            {headCells?.map((headCell) => (
              <TableCell
                key={headCell.name}
                padding={
                  headCell.name == "id"
                    ? "checkbox"
                    : headCell.disablePadding
                    ? "none"
                    : "normal"
                }
              >
                {headCell.label}
              </TableCell>
            ))}
            {removable ? <TableCell/> : null}
          </TableRow>
        </TableHead>
    );
  };

const SimpleTable: React.FC<{
    headCells: TableHeadCell[];
    rows: any;
    tableName?: string;
    removable?: boolean;
    removeFunction?: (row:any, parent?:any, tag?:any) => void;
    parent?:any;
    tag?:any;
    disableHeader?:boolean;
}> = ({headCells, rows, tableName, removable, removeFunction, parent, tag, disableHeader}) => {
  return (
    <Paper variant="outlined" sx={{width: "100%", margin: "15px 0"}}>
      <Typography sx={{margin:'15px'}}>{tableName}</Typography>
      <TableContainer>
          <Table sx={{ minWidth: 750 }} size='small' aria-labelledby="tableTitle">
              {disableHeader ? null : <EnhancedHead headCells={headCells} removable={removable} />}
              <TableBody>
                  {rows?.map((row: any, index: number) => {
                  return (
                      <TableRow role="checkbox" tabIndex={-1} key={index}>
                        {headCells.map((cell: TableHeadCell) => {
                            return (
                            <TableCell
                                key={`${cell.name}-${index}`}
                                padding={cell.name == "id" ? "checkbox" : "normal"}
                            >
                                {cell.formatter
                                ? cell.formatter(row[cell.name]) || (cell.optional && cell.optional(row))
                                : row[cell.name]}
                            </TableCell>
                            );
                        })}
                        {removable ?
                          <TableCell align='right'>
                            <IconButton onClick={removeFunction ? () => removeFunction(row, parent, tag) : undefined}>
                              <DeleteIcon color="error"/>
                            </IconButton>
                          </TableCell>
                          :
                          null
                        }
                      </TableRow>
                  );
                  })}
              </TableBody>
          </Table>
      </TableContainer>
    </Paper>
  )
}

export default SimpleTable;