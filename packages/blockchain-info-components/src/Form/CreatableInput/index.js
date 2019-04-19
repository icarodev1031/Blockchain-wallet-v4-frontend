import React from 'react'
import { difference, head, pathOr, isEmpty } from 'ramda'
import CreatableInput from './template'

const components = {
  DropdownIndicator: null
}

const createOption = label => ({
  label,
  value: label
})

class CreatableInputContainer extends React.PureComponent {
  state = {
    inputValue: '',
    value: []
  }

  componentDidMount () {
    if (!isEmpty(this.props.defaultValue)) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ value: this.props.defaultValue })
    }
  }

  componentDidUpdate (prevProps) {
    const prevValue = pathOr([], ['value', 'value'], prevProps)
    const newValue = pathOr([], ['value', 'value'], this.props)
    const diff = head(difference(newValue, prevValue))
    if (diff) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: [...prevValue, diff] })
    }
  }

  handleChange = value => {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue })
  }

  handleKeyDown = event => {
    const { inputValue, value } = this.state
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)]
        })
        if (this.props.onChange) {
          this.props.onChange({ value: [...value, createOption(inputValue)] })
        }
        event.preventDefault()
    }
  }

  handleBlur = event => {
    const { inputValue, value } = this.state
    if (!inputValue) return
    switch (event.type) {
      case 'blur':
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)]
        })
        if (this.props.onChange) {
          this.props.onChange({ value: [...value, createOption(inputValue)] })
        }
    }
  }

  render () {
    const { inputValue, value } = this.state
    return (
      <CreatableInput
        autoFocus={this.props.autoFocus}
        components={components}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleKeyDown={this.handleKeyDown}
        handleInputChange={this.handleInputChange}
        inputValue={inputValue}
        isClearable
        isMulti={this.props.isMulti}
        menuIsOpen={this.props.menuIsOpen}
        options={this.props.options}
        placeholder={this.props.placeholder || ''}
        value={value}
        // Components
        multiValueContainer={this.props.multiValueContainer}
      />
    )
  }
}

export default CreatableInputContainer
