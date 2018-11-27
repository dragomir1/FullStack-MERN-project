import React, { Component } from 'react';
// import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './Postform'
import { getPosts } from '../../store/actions/post';

class Posts extends Component {

  // we want to call this getPost as soon as this component mounts
  componentDidMount() {
    this.props.getPosts();
  }


  render() {

    const { posts, loading } = this.props.post;
    return(
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className='col-md-12'>
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

export default connect(mapStateToProps, {getPosts})(Posts);
