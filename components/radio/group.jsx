import React from 'react';
import Radio from './radio';

function getCheckedValue(children) {
  var checkedValue = null;
  children.forEach(function (radio) {
    if (radio.props && radio.props.checked) {
      checkedValue = radio.props.value;
    }
  });
  return checkedValue;
}

export default React.createClass({
  getDefaultProps: function () {
    return {
      prefixCls: 'ant-radio-group',
      onChange: function () {
      }
    };
  },
  getInitialState: function () {
    var props = this.props;
    return {
      value: props.value || props.defaultValue || getCheckedValue(props.children)
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || getCheckedValue(nextProps.children)
      });
    }
  },
  render: function () {
    var props = this.props;
    var children = props.children.map((radio) => {
      if (radio.props) {
        return <Radio
          key={radio.props.value}
          {...radio.props}
          onChange={this.onRadioChange}
          checked={this.state.value === radio.props.value}
        />;
      }
      return radio;
    });
    return (
      <div className={props.prefixCls}>
        {children}
      </div>
    );
  },
  onRadioChange: function (ev) {
    this.setState({
      value: ev.target.value
    });
    this.props.onChange(ev);
  }
});
