import React from 'react';
import Timer from './Timer';
import {AddForm} from './Forms';

class App extends React.Component {
  add(data) {
    return this.refs.Timer.add(data);
  }

  render() {
    var addForm = <AddForm addTimer={this.add.bind(this)} />;
    return (
      <div>
        <Timer ref="Timer" addForm={addForm} />        
      </div>
    )
  }
}

export default App;