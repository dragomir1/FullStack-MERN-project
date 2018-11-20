import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from  '../../../store/actions/education';


class Education extends Component{

  onDeleteClickHandler = (id)  => {
    this.props.deleteEducation(id);
  }
  render() {

    const education = this.props.education.map(edu => (
      <tr key="edu._id">
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="MM/DD/YYYY">{edu.from}</Moment>{' - '}
          {edu.to === null ? ('Current') : (<Moment format="MM/DD/YYYY">{edu.to}</Moment>)}
          </td>
        <td>
          <button
            onClick={this.onDeleteClickHandler}
            id={edu._id}
            className="btn btn-danger">
              Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4"> Education</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th>degree</th>
              <th>Years</th>
              <th></th>
            </tr>
              {education}
          </thead>
        </table>
      </div>

    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}


export default connect(null, { deleteEducation })(withRouter(Education));
