import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import MyProfileImage from '../assets/igorProfile.jpeg';
import './ChatMessage.css';
import dayjs from 'dayjs';
console.log(UserProfileImage);
export function ChatMessage({ message, sender, time }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img className="chat-message-profile" src={RobotProfileImage} />
      )}
      <div className="chat-message-text">{message}
        {time && <div className='time-div'>{dayjs(time).format('HH:mm')}</div>}
      </div>

      {sender === "user" && (
        <img className="chat-message-profile" src={MyProfileImage} />
      )}
    </div>
  );
}
