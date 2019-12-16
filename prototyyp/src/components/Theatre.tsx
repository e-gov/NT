import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { TheatreState, selectArenaMessage } from '../process/Theatre';
import { Arena } from './Arena';
import { Translation } from 'react-i18next';

interface TheatreProps {
  theatre: TheatreState;
}

class _Theatre extends React.PureComponent<TheatreProps> {
  componentDidMount() {
    require('../App.css');
    require('../bootstrap.css');
  }

  render() {
    return (
      <div>
        <Arena arena={this.props.theatre.arenas.byName[this.props.theatre.active]} />
      </div>

    )
  }
}

export const Theatre = connect(mapStateToProps)(_Theatre);

function mapStateToProps(state: AppState) {
  return { theatre: state.theatre }
}


interface ArenaSelectorProps {
  arenaNames: string[];
  selectArenaMessage: (arena: string) => void;
}

class ArenaSelectorComponent extends React.PureComponent<ArenaSelectorProps> {
  render() {
    if (this.props.arenaNames.length < 2) {
      return null;
    }
    return (
      <Translation>{(t) => (
        <select className="form-component" onChange={(ev) => this.props.selectArenaMessage(ev.currentTarget.value)}>
          {this.props.arenaNames.map(
            n => (
              <option value={n} key={n}>
                {t(n + ".arenaname")}
              </option>
            )
          )}
        </select>
      )}</Translation>
    );
  }
}

export const ArenaSelector = connect(undefined, { selectArenaMessage })(ArenaSelectorComponent);
