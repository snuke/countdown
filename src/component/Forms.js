import React from 'react';
import utils from '../utils';

export class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      date: '',
      time: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  add() {
    if (!this.props.addTimer(this.state)) {
      return;
    }
    this.setState({
      label: '',
      date: '',
      time: '',
    });
    document.add_form.reset();
  }

  render() {
    return (
      <div className="mt-3 mb-4">
        <form className="form-inline" name="add_form">
          <div className="form-group">
            <label>New</label>
            <input type="text" name="label" className="form-control mx-2" placeholder="Label" onChange={this.handleInputChange} />
            <div className="input-group mx-2">
              <input type="date" name="date" style={{width:180}} className="form-control" onChange={this.handleInputChange} />
              <input type="time" name="time" style={{width:120}} className="form-control" onChange={this.handleInputChange} />
            </div>
            <button type="button" className="btn btn-primary mx-2" onClick={() => this.add()}>Add</button>
          </div>
        </form>
      </div>
    )
  }
}

export class UpdateForm extends React.Component {
  static propsToStates(props) {
    var state = utils.deep(props.timer);
    state["prevTimer"] = utils.deep(props.timer);
    return state;
  }
  constructor(props) {
    super(props);
    this.state = UpdateForm.propsToStates(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.timer) !== JSON.stringify(prevState.prevTimer)) {
      return UpdateForm.propsToStates(nextProps);
    }
    return null;
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  getTimer() {
    return {
      "label": this.state.label,
      "date": this.state.date,
      "time": this.state.time,
    };
  }
  save() {
    this.props.setTimer(this.getTimer());
    this.props.flip();
  }
  cancel() {
    this.setState(utils.deep(this.props.timer));
    this.props.flip();
  }
  remove() {
    if (window.confirm('Are you sure you want to delete?')) {
      this.props.removeTimer();
      this.props.flip();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-9">
          <form>
            <div className="form-group row">
              <label className="col-3 col-form-label col-form-label-sm">Label</label>
              <div className="col-9">
                <input type="text" name="label" className="form-control form-control-sm" value={this.state.label} placeholder="Label" onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-3 col-form-label col-form-label-sm">Time</label>
              <div className="col-9">
                <input type="date" name="date" className="form-control form-control-sm" value={this.state.date} onChange={this.handleInputChange} />
                <input type="time" name="time" className="form-control form-control-sm" value={this.state.time} onChange={this.handleInputChange} />
              </div>
            </div>
          </form>
        </div>
        <div className="col-3">
          <div className="float-right">
            <span className="glyphicon glyphicon-trash pointer" title="remove"
              onClick={() => this.remove()}></span>
            &nbsp;
            <span className="glyphicon glyphicon-remove danger pointer" title="cancel"
              onClick={() => this.cancel()}></span>
            &nbsp;
            <span className="glyphicon glyphicon-ok success pointer" title="save"
              onClick={() => this.save()}></span>
          </div>
        </div>
      </div>
    )
  }
}
