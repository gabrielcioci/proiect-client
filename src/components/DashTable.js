import React from 'react'
import './DashTable.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DashTable = (props) => {

    const {rows, cols, userActions} = props

    const getValue = (row, column) => {

        // // Call the cell render
        // if (column.render) return column.render(row)

        // Get the value
        let value = row[column.key] ? row[column.key] : null
        return value || '-'

    }

    return (
        <div className="dash-table">
            <table>
                <thead>
                <tr className="table-heads">
                    {cols.map((col) => (
                        <th key={col.key}>
                            {col.label}
                        </th>
                    ))}
                    {userActions && <th className="empty"/>}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr className="table-rows" key={index}>
                        {cols.map(col => (
                            <td key={col.key} data-title={col.label}>
                                {getValue(row, col)}
                            </td>
                        ))}
                        {userActions && <td className="row-actions">
                            <FontAwesomeIcon className="edit" icon="user-edit"/>
                            <FontAwesomeIcon className="delete" icon="trash-alt"/>
                        </td>}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="table-footer">
                <span><FontAwesomeIcon icon="search"/>{rows.length} rezultate gasite</span>
                {userActions && <div className="btn">Adauga</div>}
            </div>
        </div>
    )
}

export default DashTable