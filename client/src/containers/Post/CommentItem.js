import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CommentItem from './CommentItem'
import { connect } from 'react-redux';
import { deleteComment } from '../../store/actions/post';

class CommentItem extends Component{

  onDeleteClickHandler = (postId, commentId) =>{
    this.props.deleteComment(postId, commentId);
  }


  render() {
    const { postId, comment, auth } = this.props;
    return(
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">
              {comment.text} { ' ' }
              {comment.user === auth.user.id ? (
                <button
                  onClick={this.onDeleteClickHandler.bind(this, postId, comment._id)}
                  type='button'
                  className='btn btn-danger mr-1'
                  >
                    <i className='fas fa-times' />
                </button>
              ): null }
            </p>
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {deleteComment})(CommentItem);
