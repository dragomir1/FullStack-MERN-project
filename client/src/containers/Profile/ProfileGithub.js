import React, { Component } from 'react';
// import isEmpty from '../../validation/isEmpty';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientID: '988930a6f325aa9c63a8',
      clientSecret: 'ffb1ad0f6ccbe47ca451d61249dccb03e854b8f5',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }



  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        if(this.refs.myRef) {
          this.setState({repos: data});
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repoItem => (
      <div key={repoItem.id} className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>
              <a href={repoItem.html_url} className='text-info' rel="noopener noreferrer" target='_blank'>
                {repoItem.name}
              </a>
            </h4>
              <p>{repoItem.description}</p>
          </div>
          <div className='col-md-6'>
            <span className='badge badge-info mr-1'>
              Stars: (repoItem.stargazers_count)
            </span>
            <span className='badge badge-secondary mr-1'>
              Watchers: (repoItem.watchers_count)
            </span>
            <span className='badge badge-success'>
              Forks: (repoItem.forks_count)
            </span>
          </div>
        </div>
      </div>
    ))
    return (
          <div ref='myRef'>
            <hr />
            <h3 className='mb-4'>Latest Github Repos</h3>
            {repoItems}
          </div>
    );
  }
}


// we need the username becuase its the prop that was passed in..
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub;
