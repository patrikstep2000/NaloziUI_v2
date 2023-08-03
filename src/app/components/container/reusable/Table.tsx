import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ThreeDotsDropdown from "./ThreeDotsDropdown";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { TableHeadCell } from "@/app/model/DataTable";
import { Option } from "@/app/model/Option";
import useApi from "@/app/lib/hooks/useApi";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f8fafc",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EnhancedHead: React.FC<{ headCells: TableHeadCell[] }> = ({
  headCells,
}) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
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
        <TableCell key="action"></TableCell>
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar: React.FC<{ tableName: string }> = ({
  tableName,
}) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {tableName}
      </Typography>
    </Toolbar>
  );
};

const TableComponent: React.FC<{
  headCells: TableHeadCell[];
  dataUrl: string;
  queryParams?: string;
  tableName: string;
  searchValue: string | null;
  onActionButtonClickList?: Option[];
  reload?: number;
  redirectUrl?: string;
}> = ({
  headCells,
  dataUrl,
  tableName,
  reload = 0,
  searchValue,
  onActionButtonClickList,
  redirectUrl,
}) => {
  const connector = useApi();
  const router = useRouter();
  const [rows, setRows] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRowsCount, setTotalRowsCount] = React.useState(0);

  const queryString = React.useMemo(() => {
    let query = `?limit=${rowsPerPage}&page=${page + 1}`;
    if (searchValue && searchValue !== "") {
      query += `&search=${searchValue}`;
    }
    return query;
  }, [page, rowsPerPage, searchValue]);

  React.useEffect(() => {
    const controller = new AbortController();

    connector.get(dataUrl + queryString, controller)
      .then(({ data }) => {
        setRows(data.data);
        if (totalRowsCount === 0) setTotalRowsCount(data.pagination.total);
      })
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, [dataUrl, queryString, reload]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar tableName={tableName} />
        <TableContainer>
          <Table
            size="small"
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedHead headCells={headCells} />
            <TableBody>
              {rows.map((row: any, index: number) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {headCells.map((cell: TableHeadCell) => {
                      return (
                        <TableCell
                          key={`${cell.name}-${index}`}
                          padding={cell.name == "id" ? "checkbox" : "normal"}
                          sx={{ cursor: "pointer" }}
                          onClick={
                            redirectUrl
                              ? () => router.push(`${redirectUrl}/${row.id}`)
                              : () => null
                          }
                        >
                          {cell.formatter
                            ? cell.formatter(row[cell.name]) ||
                              (cell.optional && cell.optional(row))
                            : row[cell.name]}
                        </TableCell>
                      );
                    })}
                    {onActionButtonClickList && (
                      <TableCell
                        key={`${"button"}-${index}`}
                        align="right"
                        padding="normal"
                      >
                        <ThreeDotsDropdown
                          id={row["id"]}
                          values={row}
                          options={onActionButtonClickList}
                        />
                      </TableCell>
                    )}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRowsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableComponent;
