import WithRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'
import { Avatar, Button, Select, Spin } from 'antd'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import SearchUser from '../../components/SearchUser'

const MdRenderer = dynamic(() => import('../../components/MarkdownRenderer'))

function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MdRenderer content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">打开Issue讨论页面</Button>
      </div>
      <style jsx>{`
        .root {
          background: #fefefe;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  )
}

function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false)
  const toggleShowDetail = useCallback(() => {
    setShowDetail(detail => !detail)
  }, [])

  return (
    <div className="issue">
      <Button
        type="primary"
        size="small"
        style={{ position: 'absolute', top: 10, right: 10 }}
        onClick={toggleShowDetail}
      >{showDetail ? '隐藏' : '查看'}</Button>
      <div className="avatar">
        <Avatar src={issue.user.avatar_url} shape="square" size={50} />
      </div>
      <div className="main-info">
        <h6>
          <span>{issue.title}</span>
        </h6>
        <p className="sub-info">
          <span>Updated at {issue.updated_at}</span>
        </p>
      </div>
      {showDetail ? <IssueDetail issue={issue} /> : null}
      <style jsx>{`
        .issue {
          display: flex;
          position: relative;
          padding: 10px;
        }
        .issue:hover {
          background: #fafafa
        }
        .issue + .issue {
          border-top: 1px solid #eee;
        }
        .main-info > h6 {
          max-width: 600px;
          font-size: 16px;
          padding-right: 40px;
        }
        .avatar {
          margin-right: 20px
        }
        .sub-info {
          margin-bottom: 0
        }
        .sub-info > span + span {
          display: inline-block;
          margin-right: 20px;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : ''
  let stateStr = state ? `state=${state}` : ''
  let labelStr = ''
  if (labels && labels.length > 0) {
    labelStr = `labes=${labels.join(',')}`
  }
  const arr = []
  if (creatorStr) arr.push(creatorStr)
  if (stateStr) arr.push(stateStr)
  if (labelStr) arr.push(labelStr)

  return `?${arr.join('&')}`
}

const Option = Select.Option

function Issues({ initIssues, labels, owner, name }) {
  // console.log(issues, labels)
  const [creator, setCreator] = useState()
  const [state, setState] = useState()
  const [label, setLabel] = useState([])
  const [issues, setIssues] = useState(initIssues)
  const [fetching, setFetching] = useState(false)

  const handleCreatorChange = useCallback(value => {
    setCreator(value)
  }, [])

  const handleStateChange = useCallback(value => {
    setState(value)
  }, [])

  const handleLabelChange = useCallback(value => {
    setLabel(value)
  }, [])

  const handleSearch = useCallback(() => {
    setFetching(true)
    api.request({
      url: `/repos/${owner}/${name}/issues${makeQuery(creator, state, label)}`
    }).then(resp => {
      setIssues(resp.data)
      setFetching(false)
    }).catch(err => {
      console.error(err)
      setFetching(false)
    })
  }, [owner, name, creator, state, label])

  return (
    <div className="root">
      <div className="search">
        <SearchUser onChange={handleCreatorChange} value={creator} />
        <Select
          placeholder="状态"
          onChange={handleStateChange}
          value={state}
          style={{ width: 100, marginLeft: 20 }}
        >
          <Option value="all">all</Option>
          <Option value="open">open</Option>
          <Option value="close">close</Option>
        </Select>
        <Select
          mode="multiple"
          placeholder="标签"
          onChange={handleLabelChange}
          value={label}
          style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }}
        >
          {
            labels.map(la => (
              <Option value={la.name} key={la.id}>{la.name}</Option>
            ))
          }
        </Select>
        <Button type="primary" disabled={fetching} onClick={handleSearch}>搜索</Button>
      </div>
      <div className="issues">
        { fetching ? <div className="loading"><Spin /></div> :
          issues.map(issue => <IssueItem issue={issue} key={issue.id} />)
        }
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .search {
          display: flex;
        }
        .loading {
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query

  const fetchs = await Promise.all([
    await api.request({
      url: `/repos/${owner}/${name}/issues`
    }, ctx.req, ctx.res),
    await api.request({
      url: `/repos/${owner}/${name}/labels`
    }, ctx.req, ctx.res)
  ])

  return {
    owner, name,
    initIssues: fetchs[0].data,
    labels: fetchs[1].data
  }
}

export default WithRepoBasic(Issues, 'issues')