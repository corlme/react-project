import React from 'react'
import './Chat.css'

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list:[]
    }
  }

 async componentDidMount () {
   let res = await this.axios.post('chats/list')
   console.log(res);
   let {meta,data} = res
   if(meta.status === 200){
     this.setState({
       list: data.list
     })
   }
 }

  render () {
    return (
      <div className="chat-container">
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>
            {this.state.list.map(item => (
              <li key={item.id}>
              <div className='avarter'>
                 <img src={'http://47.96.21.88:8086/' + item.avatar} />
                 <span className='name'>{item.username}</span>
                 <span className='info'>{item.chat_msg}</span>
                 <span className='time'>{item.ctime}</span>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Chat