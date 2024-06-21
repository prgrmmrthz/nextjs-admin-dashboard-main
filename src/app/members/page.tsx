import React from 'react'
import { getMembers } from '../actions/memberActions'

export default async function MembersPage() {
    const members = await getMembers();

  return (
    <div>
        <ul>
            {members && members.map(m => (
                <li key={m.id}>
                    {m.name}
                </li>
            ))}
        </ul>
    </div>
  )
}
