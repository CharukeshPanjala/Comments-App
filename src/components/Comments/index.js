import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInp: '',
    commentInp: '',
    commentsList: [],
  }

  onChangeName = event => {
    this.setState({nameInp: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInp: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {nameInp, commentInp} = this.state
    const color =
      initialContainerBackgroundClassNames[
        Math.ceil(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const newComment = {
      id: v4(),
      name: nameInp,
      comment: commentInp,
      date: new Date(),
      isLiked: true,
      bgClassName: color,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInp: '',
      commentInp: '',
    }))
    document.getElementById('inputName').value = ''
    document.getElementById('inputComment').value = ''
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {commentsList} = this.state
    const commentsCount = commentsList.length

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="write-comments">
          <div className="text-boxes-container">
            <form className="form">
              <p className="paragraph">Say something about 4.0 Technologies</p>
              <input
                className="name-box"
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeName}
                id="inputName"
              />
              <textarea
                className="comment-box"
                rows="8"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
                id="inputComment"
              />
              <button
                className="button"
                type="button"
                onClick={this.addComment}
              >
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
        </div>
        <hr className="line" />
        <p className="comments-count">
          <span className="number-comments">{commentsCount}</span> Comments
        </p>
        <ul className="comments-container">
          {commentsList.map(eachItem => (
            <CommentItem
              details={eachItem}
              key={eachItem.id}
              deleteComment={this.deleteComment}
              onLike={this.onLike}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
