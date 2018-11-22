import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ProfileCreds extends Component {

  render() {
    const { profile, education, experience } = this.props;

    const firstName = profile.user.name.trim().split(' ')[0];

    const experiences = experience.map(exp => (
      <div>
        <ul className="list-group">
          <li key={exp._id} className="list-group-item">
            <h4>{isEmpty(exp.company)? (<span>{firstName} doesn't have a company.</span>) : (<span>{exp.company}</span>)}</h4>
              <p><Moment format="MM/DD/YYYY">{exp.from}</Moment>{' - '}
              {exp.to === null ? ('Current') : (<Moment format="MM/DD/YYYY">{exp.to}</Moment>)}
            </p>
            <p>
              <strong>Position:</strong> {exp.title}
            </p>
            <p>
              {exp.location === '' ? "no location" : (<span><strong>Location: </strong> {exp.location}</span>)}
            </p>
            <p>
              {exp.description === '' ? "no description" : (<span><strong>Location: </strong> {exp.description}</span>)}
            </p>
          </li>
        </ul>
      </div>
    ))

    const educations = education.map(edu => (
      <ul className="list-group">
        <li key={edu._id} className="list-group-item">
          <h4>{isEmpty(edu.school)? (<span>{firstName} doesn't have a school.</span>) : (<span>{edu.school}</span>)}</h4>
          <p><Moment format="MM/DD/YYYY">{edu.from}</Moment>{' - '}
          {edu.to === null ? ('Now') : (<Moment format="MM/DD/YYYY">{edu.to}</Moment>)}</p>
          <p>
            <strong>Degree: </strong>{edu.degree}</p>
          <p>
            <strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
            <p>
              <strong>Description:</strong> {edu.description}</p>
        </li>
      </ul>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experiences.length > 0 ? (<ul className='list-group'>{experiences} </ul>) : (<ul className='text-center'>No Experience listed</ul>)}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {educations.length > 0 ? (<ul className='list-group'>{educations} </ul>) : (<ul className='text-center'>No Education listed</ul>)}
        </div>
      </div>
    )
  }
}

ProfileCreds.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileCreds;
