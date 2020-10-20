import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

class TableBody extends Component {
  renderCell = (item, column, index) => {
    // console.log(column.content);
    if (column.content) return column.content(item, index);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={item._id}>
            {columns.map((column) =>
              column.path === "title" ? (
                <td key={this.createKey(item, column)}>
                  <Link to={`/movies/${item._id}`}>
                    {this.renderCell(item, column, index)}
                  </Link>
                </td>
              ) : (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column, index)}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
