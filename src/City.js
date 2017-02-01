import React, {Component} from 'react'
import './City.css';


class City extends Component  {
  constructor(){
    super()

    this.state = {
      highlighted: false
    }
  }

  handleHighlight = () => {
    console.log('this', this)
    const {highlighted} = this.state

    this.setState({
      highlighted: !highlighted
    })

    console.log(this.state.highlighted)

  }

  render(){
    const {name, population} = this.props
    const {highlighted} = this.state

    return (
      <div className={highlighted ? 'highlight' : ''}>
        City is <b>{name}</b>, popuation is {population}
        <button onClick={this.handleHighlight} className="hollow button warning small"> Highlight</button>
      </div>
    )
  }
}

export default City
