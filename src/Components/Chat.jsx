import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let backend_api = 'https://chat-backend-4jgm.onrender.com'


const Chat = ({ pvs, joinToChat, sendMsg, messages ,removeMsg }) => {
  const [user, setUser] = useState({})
  const [receiver, setReceiver] = useState(null)
  const [message, setMessage] = useState('')
  console.log('New Msg ->' , messages)

  const navigate = useNavigate()

  const authUser = async token => {
    let res = await fetch(`${backend_api}/api/auth/me`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })

    if (res.status == 200) {
      let data = await res.json()
      console.log('user Infos -> ' , data)
      setUser({ ...data })
    } else {
      location.href = '/auth'
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      authUser(token)
    } else {
      navigate('/auth')
    }
  }, [])

  const sendMsgHandler = event => {
    event.preventDefault()
    sendMsg(message, user.username, receiver.username)
    setMessage('')
  }

  return (
    <main className="main">
      <section className="costom-row">
        <div className="costom-col-3">
          <section className="sidebar">
            <div className="sidebar__header">
              <div className="sidebar__menu">
                <i className="sidebar__menu-icon animated-menu-icon"></i>
              </div>
              <div className="sidebar__searchbar">
                <input
                  type="text"
                  className="sidebar__searchbar-input"
                  placeholder="Search"
                />
                <i className="sidebar__searchbar-icon fa fa-search"></i>
              </div>
            </div>
            <div className="sidebar__categories">
              <ul className="sidebar__categories-list">
                <li
                  className="sidebar__categories-item sidebar__categories-item--active"
                  data-category-name="all"
                >
                  <span className="sidebar__categories-text">Pvs</span>
                  {/* <span className="sidebar__categories-counter sidebar__counter">3</span> */}
                </li>
              </ul>
            </div>
            <div className="sidebar__contact data-category-all sidebar__contact--active">
              <ul className="sidebar__contact-list">
                {pvs.map(pv => (pv.username !== user.username &&
                  <li
                    key={pv._id}
                    className={`sidebar__contact-item ${receiver?.username == pv.username && 'active'}`}
                    onClick={() => {
                      setMessage('')
                      setReceiver({ ...pv })
                      joinToChat(user.username, pv.username)
                    }}
                  >
                    <a className="sidebar__contact-link" href="#">
                      <div className="sidebar__contact-left">
                        <div className="sidebar__contact-left-left">
                          <img
                            className="sidebar__contact-avatar"
                            src="data:image/jpeg;base64,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"
                          />
                        </div>
                        <div className="sidebar__contact-left-right">
                          <span className="sidebar__contact-title">
                            {pv.username}
                          </span>
                          <div className="sidebar__contact-sender">
                            <span className="sidebar__contact-sender-name">
                              Qadir Yolme :
                            </span>
                            <span className="sidebar__contact-sender-text">
                              سلام داداش خوبی؟
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sidebar__contact-right">
                        <span className="sidebar__contact-clock">15.53</span>
                        <span className="sidebar__contact-counter sidebar__counter sidebar__counter-active">
                          66
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar__contact data-category-group">
              <ul className="sidebar__contact-list">
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            ijrewijgfjierjigjierij
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            ijrewijgfjierjigjierij
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="sidebar__contact data-category-people">
              <ul className="sidebar__contact-list">
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام داداش خوبی؟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            سلام ییییییییییییییییییییی
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="sidebar__contact data-category-channle">
              <ul className="sidebar__contact-list">
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            ijrewijgfjierjigjierij
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar__contact-item">
                  <a className="sidebar__contact-link" href="#">
                    <div className="sidebar__contact-left">
                      <div className="sidebar__contact-left-left">
                        <img
                          className="sidebar__contact-avatar"
                          src="public/images/avatar.jpg"
                        />
                      </div>
                      <div className="sidebar__contact-left-right">
                        <span className="sidebar__contact-title">
                          Sabzlearn support
                        </span>
                        <div className="sidebar__contact-sender">
                          <span className="sidebar__contact-sender-name">
                            Qadir Yolme :
                          </span>
                          <span className="sidebar__contact-sender-text">
                            ijrewijgfjierjigjierij
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__contact-right">
                      <span className="sidebar__contact-clock">15.53</span>
                      <span className="sidebar__contact-counter sidebar__counter">
                        4
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <button className="sidebar-bottom-btn btn-circle rp btn-corner z-depth-1 btn-menu-toggle">
            <span className="tgico animated-button-icon-icon animated-button-icon-icon-first">
              
            </span>
          </button>
        </div>
        <div className="costom-col-9 container-hide">
          <section className="chat">
            <div className={`chat__header ${receiver && 'chat__header--active'}`}>
              <div className="chat__header-left">
                <button className="btn-icon sidebar-close-button">
                  <span className="tgico button-icon"></span>
                  <span className="badge badge-20 badge-primary is-badge-empty back-unread-badge"></span>
                </button>
                <div className="chat__header-left-left">
                  <img
                    className="chat__header-avatar"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH0xuC8da1DdVU94AEl9PXOXWnAeRilZEpiw&s"
                  />
                </div>
                <div className="chat__header-left-right">
                  <span className="chat__header-name">{receiver?.username}</span>
                  <span className="chat__header-status">
                    last seen recently
                  </span>
                </div>
              </div>
              <div className="chat__header-right">
                <div className="chat__header-search icon-phone">
                  <span className="tgico button-icon chat__header-phone-icon"></span>
                </div>
                <div className="chat__header-search">
                  <i className="chat__header-search-icon fa fa-search"></i>
                </div>
                <div className="chat__header-menu">
                  <i className="chat__header-menu-icon fa fa-ellipsis-v"></i>
                </div>
              </div>
            </div>
            <div className={`chat__content ${receiver && 'chat__header--active'}`}>
              <div className="chat__content-date">
                <span className="chat__content-date-text"> Today </span>
              </div>
              <div className="chat__content-main">
                {/* <div className="chat__content-sender-wrapper chat__content-wrapper">
                  <div className="chat__content-sender">
                    <span className="chat__content-sender-text">
                      این راست نیست که هرچه عاشق‌ تر باشی بهتر درک می‌کنی. همه‌ی
                      آنچه عشق و عاشقی از من می‌ خواهد فقط درکِ این حکمت است:
                      دیگری نشناختنی است؛ ماتیِ او پرده‌ی ابهامی به روی یک راز
                      نیست، بل گواهی است که در آن بازیِ بود و نمود هیچ‌ جایی
                      ندارد. پس من در مسرتِ عشق ورزیدن به یک ناشناس غرق می‌شوم،
                      کسی که تا ابد ناشناس خواهد ماند. سِیری عارفانه: من آن‌چه
                      را نمی‌شناسم می‌شناسم...!
                    </span>
                    <span className="chat__content-chat-clock">17:55</span>
                  </div>
                </div>
                <div className="chat__content-receiver-wrapper chat__content-wrapper">
                  <div className="chat__content-receiver">
                    <span className="chat__content-receiver-text">بنازمم</span>
                    <span className="chat__content-chat-clock">17:55</span>
                  </div>
                </div> */}

                {messages.map(messageData => {
                  // console.log(messageData.msgID)
                  if (user.username == messageData.pv.sender) {
                    return (
                      <div key={messageData.msgID} id={`msg-${messageData.msgID}`} className="chat__content-receiver-wrapper chat__content-wrapper">
                        <div className="chat__content-receiver">
                          <span className="chat__content-receiver-text">{messageData.message}</span>
                          <span className="chat__content-chat-clock">
                            <span>17:55</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {removeMsg(messageData.msgID)}} className="size-6 remove-msg-icon">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div key={messageData.msgID} id={`msg-${messageData.msgID}`} className="chat__content-sender-wrapper chat__content-wrapper">
                        <div className="chat__content-sender">
                          <span className="chat__content-sender-text">
                            {messageData.message}
                          </span>
                          <span className="chat__content-chat-clock">17:55</span>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              <div className="chat__content-bottom-bar">
                <div className="chat__content-bottom-bar-left">
                  <form onSubmit={sendMsgHandler}>
                    <input
                      onChange={event => setMessage(event.target.value)}
                      className="chat__content-bottom-bar-input"
                      placeholder="Message"
                      type="text"
                      value={message}
                    />
                  </form>
                  <i className="chat__content-bottom-bar-icon-left tgico button-icon laugh-icon"></i>
                  <i className="chat__content-bottom-bar-icon-right tgico button-icon file-icon"></i>
                </div>
                <div className="chat__content-bottom-bar-right">
                  <i className="chat__content-bottom-bar-right-icon fa fa-microphone"></i>
                </div>
                <div className="chat__content-bottom-bar-right">
                  <span
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      top: "-37px",
                      fontSize: "2.4rem",
                      visibility: "hidden",
                      opacity: "0",
                    }}
                    className="chat__content-bottom-bar-right-icon tgico button-icon arrow-bottom-icon__active"
                  >
                    
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div className="contact-menu context-menu">
        {/* <ul className="contact-menu__list context-menu__list">
                <li className="contact-menu__item context-menu__item">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new salam</span>
                </li>
            
                <li className="contact-menu__item context-menu__item">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new tab</span>
                </li>
            
                <li className="contact-menu__item context-menu__item">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new tab</span>
                </li>
            
                <li className="contact-menu__item context-menu__item">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new tab</span>
                </li>
            
                <li className="contact-menu__item context-menu__item">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new tab</span>
                </li>
            
                <li className="contact-menu__item context-menu__item context-menu__item-delete">
                    <i className="contact-menu__icon context-menu__icon fa fa-trash"></i>
                    <span className="contact-menu__text context-menu__text">Open in new tab</span>
                </li>
            
        </ul> */}
      </div>

      <div className="chat-menu context-menu">
        <div className="contact-menu__list context-menu__list">
          <div className="contact-menu__item context-menu__item">
            <span className="tgico btn-menu-item-icon"></span>
            <span className="contact-menu__text context-menu__text">Reply</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">Copy</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Translate
            </span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">Pin</span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Forward
            </span>
          </div>
          <div className="contact-menu__item context-menu__item">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Select
            </span>
          </div>
          <div className="contact-menu__item context-menu__item danger">
            <span className="contact-menu__icon context-menu__icon tgico btn-menu-item-icon">
              
            </span>
            <span className="contact-menu__text context-menu__text">
              Delete
            </span>
          </div>
        </div>
      </div>

      <div className="setting-menu">
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Saved Messages
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Archived Chats
          </span>
          <span
            style={{ flex: "1", textAlign: "right", opacity: "0.7" }}
            className="badge badge-24 badge-gray archived-count"
          >
            6
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            My Stories
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Contacts
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Settings
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Dark Mode
          </span>
          <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
            <input className="checkbox-field-input" type="checkbox" />
            <div className="checkbox-toggle">
              <div className="checkbox-toggle-circle"></div>
            </div>
          </label>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Animations
          </span>
          <label className="checkbox-field checkbox-without-caption checkbox-field-toggle">
            <input className="checkbox-field-input" type="checkbox" />
            <div className="checkbox-toggle">
              <div className="checkbox-toggle-circle"></div>
            </div>
          </label>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Telegram Features
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Report Bug
          </span>
        </div>
        <div className="contact-menu__item context-menu__item a">
          <span className="tgico btn-menu-item-icon">A</span>
          <span className="contact-menu__text context-menu__text">
            Switch to A version
          </span>
        </div>
        <div className="contact-menu__item context-menu__item">
          <span className="tgico btn-menu-item-icon"></span>
          <span className="contact-menu__text context-menu__text">
            Install App
          </span>
        </div>
        <a
          href="https://github.com/morethanwords/tweb/blob/master/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-menu-footer"
        >
          <span className="btn-menu-footer-text">
            Telegram WebK 2.1.0 (509)
          </span>
        </a>
      </div>
    </main>
  );
}

export default Chat;
