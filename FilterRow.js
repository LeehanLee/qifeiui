import React, { Component } from "react";

const filterNames = ["Sector", "Region", "Country", "State"];

const data1 = {
  Sector: [
    { dimname: "Sector 112", owlid: "owlid Sector 1 " },
    { dimname: "Sector 333", owlid: "owlid Sector 2 " },
    { dimname: "Sector 55678", owlid: "owlid Sector 3" }
  ],
  Region: [
    { dimname: "Region 1", owlid: "owlid Region1" },
    { dimname: "Region 2", owlid: "owlid Region2" },
    { dimname: "Region3", owlid: "owlid Region3" }
  ],
  Country: [
    { dimname: "Country 1", owlid: "owlid Country1" },
    { dimname: "Country2", owlid: "owlid Country2" },
    { dimname: "Country3", owlid: "owlid Country3" }
  ],
  State: [
    { dimname: "State1", owlid: "owlid State1" },
    { dimname: "State2", owlid: "owlid State2" },
    { dimname: "State3", owlid: "owlid State3" }
  ]
};
const data2 = {
  Sector: [
    { dimname: "Sector xxx", owlid: "owlid Sector xxx" },
    { dimname: "Sector yyy", owlid: "owlid Sector yy" },
    { dimname: "Sector zzz", owlid: "owlid Sector z" }
  ],
  Country: [
    { dimname: "Country xxx", owlid: "Country owlid xxx" },
    { dimname: "Country yyy", owlid: "Country owlid yy" },
    { dimname: "Country zzz", owlid: "Country owlid z" }
  ],
  State: [
    { dimname: "State xxx", owlid: "State owlid xxx" },
    { dimname: "State yyy", owlid: "State owlid yy" },
    { dimname: "State zzz", owlid: "State owlid z" }
  ]
};

class FilterRow extends Component {
  constructor() {
    super();
    this.state = { data: data1 };
    this.changeData = this.changeData.bind(this);
  }

  changeData() {
    const newData = this.state.data === data1 ? data2 : data1;
    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.changeData}>change data</button>
        {filterNames.map((name, index) => {
          const data = this.state.data[name];
          return data ? (
            <FilterPopover key={index} name={name} data={data} />
          ) : null;
        })}
      </div>
    );
  }
}

class FilterPopover extends Component {
  constructor(props) {
    super();
    console.log("正在执行FilterPopover的构造方法: ", props.name, props.data);
  }

  render() {
    return (
      <div>
        this is the {this.props.name}
        {this.props.data.map((d, index) => {
          return (
            <p key={index}>
              {d.dimname} - {d.owlid}
            </p>
          );
        })}
      </div>
    );
  }
}

export default FilterRow;
