import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from "classnames";
import { Link } from 'react-router-dom';
import Post from '../Post/Post';
import { deletePost, likePost, unlikePost } from '../../store/actions/post';

class PostItem extends Component {

  onDeleteClickHandler = (id) => {
    this.props.deletePost(id);
  }

  likePostHandler = (id) => {
    this.props.likePost(id);
  }

  unlikePostHandler = (id) => {
    this.props.unlikePost(id);
  }
  findUserLike(likes){
    const { auth } = this.props;
    if(likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }

  }

  render() {

      const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">
            {post.text}
            </p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.likePostHandler.bind(this, post._id)}>
                  <i className={classnames('fas fa-thumbs-up', {
                    'text-info': this.findUserLike(post.likes)
                  })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.unlikePostHandler.bind(this, post._id)}>
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClickHandler.bind(this, post._id)}
                    type='button'
                    className='btn btn-danger mr-1'
                    >
                      <i className='fas fa-times' />
                  </button>
                ): null }
              </span>)
              : null}
          </div>
        </div>
      </div>

    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}


const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, {deletePost, likePost, unlikePost})(PostItem);
