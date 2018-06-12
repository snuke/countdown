import React from 'react';
import moment from 'moment';
import utils from '../utils';
import {UpdateForm} from './Forms';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
  }

  flip() {
    var prevFlipped = this.state.flipped;
    this.setState({
      flipped: !prevFlipped,
    });
    if (!prevFlipped) {
      this.props.flipOthers();
    }
  }

  render() {
    var label = this.props.timer.label;
    var url = this.props.timer.url;
    var labelDom = url ? (<a href={url} target="_blank">{label}</a>) : label;
    var time = utils.getMoment(this.props.timer);
    var now = this.props.now;
    var rest = time - now;
    var days = null;
    if (rest < 0) {
      rest = "Finished";
    } else {
      rest = moment.duration(rest);
      days = rest.days();
      rest = days ? rest.format('d[days] hh:mm') : rest.format('hh:mm:ss', {trim: false});
    }

    return (
      <div className="col-lg-6">
        <div className={"flip-container" + (this.state.flipped?" flipped":"")}>
          <div className="flipper">
            <div className="front">
              <div className="card border-secondary mb-2">
                <div className="card-body">
                  <h5 className="card-title">
                    {labelDom}
                    <div className="float-right">
                      <span className="glyphicon glyphicon-cog pointer"
                        onClick={() => this.flip()}></span>
                    </div>
                  </h5>
                  <h6 className="card-subtitle mb-3 text-muted">{time.format('YYYY/MM/DD(ddd) HH:mm')}</h6>
                  <h1 className={"text-center fixed-width no-break" + (days?" rest-days":"")}>{rest}</h1>
                </div>
              </div>
            </div>
            <div className="back">
              <div className="card border-secondary mb-2">
                <div className="card-body">
                  <UpdateForm ref="UpdateForm" timer={this.props.timer} flip={() => this.flip()}
                    setTimer={this.props.setTimer} removeTimer={this.props.removeTimer}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;