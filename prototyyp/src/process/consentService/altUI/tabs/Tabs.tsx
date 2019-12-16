import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

interface Props {
  children: React.ReactElement<any>[];
}

interface State {
  activeTab: string;
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
    id?: string;
  }
}

class Tabs extends React.Component<Props, State> {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.id,
    };
  }

  onClickTabItem = (tab: string) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div>
        <div id="sidebar">
          <ol>
            {children.filter(c => c.props.label !== undefined).map((child) => {
              const { id, label } = child.props;

              return (
                <Tab
                  activeTab={activeTab}
                  key={id}
                  label={label}
                  id={id}
                  onClick={() => onClickTabItem(id)}
                />
              );
            })}
          </ol>
        </div>
        <div className="section">
          {children.map((child) => {
            if (child.props.id !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;