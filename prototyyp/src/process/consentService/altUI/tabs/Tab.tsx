import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  activeTab: string;
  label: string;
  id: string;
  onClick: (tab: string) => void;
}

export class Tab extends React.Component<Props, {}> {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
        id
      },
    } = this;

    let className = 'sidebar-item';

    if (activeTab === id) {
      className += ' active';
    }

    return (
      <li
        className={className}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        key={id}
      >
        {label}
      </li>
    );
  }
}

export default Tab;