import React from 'react';


const MeetupsList = (props) => (
  <div className="meetups-list">
  {props.meetups.map((item) => {
    return (
      <div key={item.id}>
        <div><a href={item.link}>{item.name}</a></div>
        <div>{item.group.name}</div>
        <div>{item.local_date}</div>
        <button onClick={() => {props.handleClick(item)}}>{props.showFavorites ? "Remove Meetup" : "I'm interested"}</button>
        <br/>
      </div>
    )
  })}
  </div>
)


export default MeetupsList;