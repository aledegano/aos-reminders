import React, { Fragment } from 'react'

import { ITurnAction } from 'meta/turn_structure'
import { ISelections } from 'types/selections'
import { processReminders } from 'utils/processReminders'
import { TSupportedFaction } from 'meta/factions'
import './reminders.css'
import { titleCase } from 'utils/titleCase';
import { IArmy } from 'types/army';

const Reminders = (props: { army: IArmy, factionName: TSupportedFaction; selections: ISelections }) => {
  const { factionName, selections, army } = props
  const reminders = processReminders(army, factionName, selections)

  return (
    <div className="row w-75 mx-auto pt-5 d-block">
      {Object.keys(reminders).map((key, i) => {
        return <Entry when={key} actions={reminders[key]} key={i} />
      })}
    </div>
  )
}

const Entry = (props: { when: string; actions: ITurnAction[] }) => {
  return (
    <div className="row d-block">
      <div className="card border-dark my-3">
        <div className="card-header text-center">
          <h2>{titleCase(props.when)}</h2>
        </div>
        <div className="card-body">
          {props.actions.map((a, i) => {
            return (
              <Fragment key={i}>
                <p className="ReminderEntry">
                  {a.name ? <b>{a.name}: </b> : null}
                  {a.action}
                </p>
                <small>Because you have: {a.condition.join(', ')}</small>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Reminders
