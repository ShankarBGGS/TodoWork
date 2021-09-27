import './index.css'

import {Component} from 'react'

import TodoItem from '../TodoItem'
import {FiRefreshCcw} from 'react-icons/fi'
import {BiSearchAlt} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

const sortbyOptions = [
  {
    optionId: 'ALL',
    displayText: 'ALL',
  },
  {
    optionId: 'THIRDS',
    displayText: 'thirds',
  },
  {
    optionId: 'FIFTHS',
    displayText: 'fifths',
  },
  {
    optionId: 'MAGIC',
    displayText: 'magics',
  },
]

class Events extends Component {
  state = {
    allPosts: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    const options = {
      headers: {
        Authorization: 'Bearer',
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    this.setState({allPosts: fetchedData, isLoading: false})
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value})
  }

  searchInput = () => {

  }

  renderSortList = () => {
    const {activeOptionId, allPosts} = this.state
    switch (activeOptionId) {
      case "ALL":
        return allPosts
      case 'THIRDS':
        return (allPosts.filter(each => each.id%3 === 0))
      case 'FIFTHS':
        return (allPosts.filter(each => each.id%5 === 0))
      case 'MAGIC':
        return (allPosts.filter(each => each.id%3 === 0 || each.id%5 === 0))
      default:
        return null
    }
  }

  onDeleteList = id => {
    const {allPosts} = this.state
    const removeItem  = allPosts.filter(eachPost => eachPost.id !== id)
    this.setState({allPosts: removeItem})
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  refreshPage = () => {
    this.getProducts()
    this.setState({activeOptionId: sortbyOptions[0].optionId})
  }


  render() {
    const {isLoading, activeOptionId, searchInput} = this.state
    const renderedList = this.renderSortList()

    const searchList = renderedList.filter(eachFilter =>
      eachFilter.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="bg">
        <h1 className="heading">Todo assignment</h1>
        <div className="inputContainer">
          <input type="search" className="inputBox" onChange={this.onChangeInput} placeholder="Enter Title to Filter Results."/>
          <BiSearchAlt  className="searchIcon"/>
        </div> 
        <div className="downContainer">
          <div className="Box1">
            <h1 className="category">Category Container</h1>
            <div className="dropDown">
                <select className="selectBox" value={activeOptionId} onChange={this.onChangeSortBy}>
                    {sortbyOptions.map(eachOption => (
                      <option value={eachOption.optionId} key={eachOption.optionId}>
                        {eachOption.displayText}
                      </option>
                    ))}
                </select>
            </div>
            <div className="refreshBox">
              <h1 className="refresh">Refresh Page: </h1>
              <FiRefreshCcw  onClick={this.refreshPage} className="refreshButton"/>
            </div>
          </div>
          {isLoading ? (
            <div testid="loader" className="loader">
            <Loader type="spinner" color="black" height={50} width={50} />
          </div>
          )  : (
            <ul className="unorderedBox">
            {searchList.map(each => (
              <TodoItem key={each.id} eachData={each} onDeleteList={this.onDeleteList}/>
            ))}
          </ul>
          )} 
        </div>
      </div>
    )
  }
}

export default Events