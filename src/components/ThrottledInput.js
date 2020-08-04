import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import autoBind from 'react-autobind';

/**
 * ThrottledInput Component:
 * Used for price list search input
 */

export default class ThrottledInput extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      value: ''
    };
  }

  componentWillMount() {
    this.setState({
      value: this.props.value || ''
    });
  }

  componentWillUpdate(nextProps) {
    if (this.isDebouncing) return;

    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value || ''
      });
    }
  }

  triggerChange = debounce((e, onChange, self) => {
    self.isDebouncing = false;
    onChange(e);
  }, 500);

  onChange(e) {
    e.persist();

    this.setState(
      {
        value: e.target.value
      },
      then => {
        if (this.props.onChange) {
          this.isDebouncing = true;
          this.triggerChange(e, this.props.onChange, this);
        }
      }
    );
  }

  render() {
    return (
      <input
        {...this.props}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
