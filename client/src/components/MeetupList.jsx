import React from 'react';


const MeetupList = (props) => (
  <div>
  {props.meetups.map((item) => {
    return (
      <div key={item.id}>
        <div><a href={item.link}>{item.name}</a></div>
        <div>{item.group.name}</div>
        <div>{item.local_date}</div>
      </div>
    )
  })}
  </div>
)


export default MeetupList;