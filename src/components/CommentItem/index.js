import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {details, deleteComment, onLike} = props
  const {id, name, comment, bgClassName, date, isLiked} = details
  const color = isLiked ? '' : 'color'
  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const postedTime = formatDistanceToNow(date)
  const firstLetter = name[0]
  const deleteOnClick = () => {
    deleteComment(id)
  }
  const onLikeButton = () => {
    onLike(id)
  }
  return (
    <li className="comment" key={id}>
      <div className="first-container">
        <p className={`first-letter ${bgClassName}`}>{firstLetter}</p>
        <div className="second-container">
          <div className="third-container">
            <p className="name">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="comment-description">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <button
          className="like-container button1"
          type="button"
          onClick={onLikeButton}
        >
          <img src={imageUrl} className={`like-image ${color}`} alt="like" />
          <p className={`like ${color}`}>LIKE</p>
        </button>
        <button
          type="button"
          className="button1"
          onClick={deleteOnClick}
          testId="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}

export default CommentItem
