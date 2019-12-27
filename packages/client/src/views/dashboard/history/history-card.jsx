import React from 'react'
import {Card, Typography, Modal} from 'antd'
import shortid from 'shortid'
import LinkButton from '../../../widgets/buttons/link-button'

function turns(turns) {
  Modal.info({
    title: 'History of the game',
    content: (
      <div>
        {turns.map((t, i) => <p key={shortid.generate()}>{i % 2 ? 'AI' : 'Client'}: {t.turn}</p>)}
      </div>
    ),
    onOk() {}
  })
}

export default function ({history}) {
  return (
    <Card>
      <Typography.Paragraph>
        Winner: {history.winner || '...'}
      </Typography.Paragraph>
      <Typography.Paragraph>
        Date: {new Date(history.date).toLocaleDateString()}
      </Typography.Paragraph>
      <LinkButton onClick={() => turns(history.history)}>Turns({history.history.length})</LinkButton>
    </Card>
  )
}
