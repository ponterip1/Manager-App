import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDateSource(this.props);
  }

  //called with the new set of props the component is about to be fed
  //captured as the first argument to the method
  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    this.createDateSource(nextProps);
  }

  createDateSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  /* state.employees is object of employees, has many key value pairs
   * for every element in the object, take employee model{name, phone, shift}(val) and key(uid)
   * create new object, push in all values, throw id on top
   * end result object { shift: 'monday', name: 'S, id: '1d332f'}
   * return object containing all properties of employee model and user id
   * maps to array
   */
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
