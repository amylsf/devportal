import React from 'react';


const MeetupsList = (props) => (
  <div className="meetups-list">
  {props.meetups.map((item) => {
    return (
      <div key={item.id} className="meetup">
        <div className="meetup-title"><a href={item.link}>{item.name}</a></div>
        <a href={`https://www.meetup.com/${item.groupurl}`}><div className="meetup-group">{item.groupname}</div></a>
        <div className="meetup-date">{item.local_date}</div>
        <button onClick={() => {props.handleClick(item)}}>{props.showFavorites ? "Remove Meetup" : "I'm interested"}</button>
        <br/>
      </div>
    )
  })}
  </div>
)


export default MeetupsList;