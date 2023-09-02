import React from 'react'
import StatusCSS from '../../assets/styles/Status.module.css'
import HeadingTag from '../../components/ui/HeadingTag'

const Status = ({ statuses }) => {
  console.log("let us print status: ", statuses)
  return (
    <div className={StatusCSS.statusMainDiv}>
      <div className={StatusCSS.statusTitle}>
        <HeadingTag type='h4' tagTitle={"Statuses"} />
      </div>
      <div className={StatusCSS.displayStatus}>
        {statuses.map(status => {
          return (
            <p>{status.content}</p>
          )

        })}
      </div>
    </div>
  )
}

export default Status
