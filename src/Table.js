import React, {useMemo} from 'react'
import { useTable, usePagination } from 'react-table'
import DateEditableCell from "./DateEditableCell";


export default function Table({data, updateMyData, skipPageReset }) {
    const columns = useMemo(
        () => [
            {
                Header: 'UserId',
                accessor: 'id'
            },
            {
                Header: 'Date Registration',
                FieldName: 'dateRegistration',
                accessor: value => value.dateRegistration,
                Cell: props => <DateEditableCell {...props}/>
            },
            {
                Header: 'Date Last Activity',
                FieldName: 'dateLastActivity',
                accessor: value => value.dateLastActivity,
                Cell: props => <DateEditableCell {...props}/>
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page
    } = useTable(
        {
            columns,
            data,
            updateMyData,
        },
        usePagination
    )

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
