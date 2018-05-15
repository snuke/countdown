import React from 'react';
import moment from 'moment';
import utils from '../utils';
import Card from './Card';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      timers: utils.loadTimers(),
    };

    setInterval(() => {
      var now = moment();
      if (this.state.now.isSame(now, "second")) return;
      this.setState({
        now: now,
      });
    }, 30);
  }

  setTimers(timers) {
    if (!utils.validateTimers(timers)) return false;
    timers.sort(function(a, b) {
      var ma = utils.getMoment(a);
      var mb = utils.getMoment(b);
      if (!ma.isSame(mb)) return ma.isBefore(mb)?-1:1;
      if (a.label !== b.label) return a.label<b.label?-1:1;
      return 0;
    });
    this.setState({
      timers: timers,
    });
    utils.saveTimers(timers);
    return true;
  }

  add(timer) {
    if (!timer.label) return false;
    if (!timer.date) return false;
    if (!timer.time) return false;
    var timers = utils.loadTimers();
    timers.push(timer);
    if (!this.setTimers(timers)) return false;
    return true;
  }

  render() {
    var timers = utils.deep(this.state.timers);
    var cards = [], cardsFinished = [];
    var setTimer = i => { return timer => {
      var timers = utils.deep(this.state.timers);
      timers[i] = timer;
      this.setTimers(timers);
    }};
    var removeTimer = i => { return () => {
      var timers = utils.deep(this.state.timers);
      timers.splice(i,1);
      this.setTimers(timers);
    }};
    var flipOthers = i => { return () => {
      for (var j = 0; j < this.state.timers.length; j++) {
        if (i === j) continue;
        var card = this.refs['Card'+j];
        if (card.state.flipped) {
          card.setState({
            flipped: false,
          });
        }
      }
    }};
    for (var i = 0; i < timers.length; i++) {
      var card = (
        <Card key={i} ref={'Card'+i} now={this.state.now} timer={timers[i]}
          setTimer={setTimer(i)} removeTimer={removeTimer(i)} flipOthers={flipOthers(i)}/>
      );
      if (utils.getMoment(timers[i]) - this.state.now < 0) {
        cardsFinished.push(card);
      } else {
        cards.push(card);
      }
    }
    return (
      <div>
        <div className="row">
          {cards}
        </div>
        {this.props.addForm}
        <hr />
        <div className="row mt-4">
          {cardsFinished}
        </div>
      </div>
    );
  }
}

export default Timer;