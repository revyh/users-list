import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

const progressStyles = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export default class LoadData extends React.Component {
  static defaultProps = {
    loadState: 'success',
  };

  componentDidMount() {
    if (this.props.loadState !== 'loading')
      this.handleLoad();
  }

  handleLoad = () => {
    this.props.onLoad && this.props.onLoad();
  };

  render() {
    const {loadState, children} = this.props;

    if (loadState === 'loading')
      return (
        <CircularProgress
          style={progressStyles}
          size={80}
          thickness={5}
        />
      );

    return (
      <div>
        {children}
        <Snackbar
          open={loadState === 'fail'}
          message="Sorry, something went wrong."
          action="Try again"
          onActionTouchTap={this.handleLoad}
        />
      </div>
    );
  }
}
