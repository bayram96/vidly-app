import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortOrder;
    if (this.props.sortColumn.path === path) {
      sortOrder = this.props.sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortOrder = "asc";
    }
    this.props.onSort({ path: path, order: sortOrder });
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
