import React, {Component} from 'react';
import './Snackbar.css';
import PropTypes from 'prop-types';
import { COLORS, GRADIENTS } from '../ColorSchema';


class SnackBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        };
        this.handleClick = this.handleClick.bind(this);
        this.onClickDismiss = this.onClickDismiss.bind(this);
    }

    handleClick() {
        return this.props.handleClick ? this.props.handleClick(this.onClickDismiss) : this.onClickDismiss();
    }

    onClickDismiss() {
        this.setState({ visible: false });
    }

    generateMessage() {
        let message = [];
        let SnackbarHeight;
        if (this.props.message > 35) {
            let line1Complete = false;
            message = this.props.message
                .substring(0, 70)
                .split(' ')
                .reduce((arr, msg) => {
                    if (arr[0].length < 35 && !line1Complete) {
                        if (arr[0].length + msg.length > 35) {                      // when too big for 1 line
                            arr.concat(msg);
                            line1Complete = true;
                        } else {
                            arr[0] = arr[0].length ? `${arr[0]  } ${  msg}` : msg;      // construct line 1
                        }    
                    } else {
                        arr[1] = arr[1].length ? `${arr[1]  } ${  msg}` : msg;      // construct line 2                        
                    }
                    return arr;
                }, []);
            SnackbarHeight = "68px";                
        } else {
            message = message.concat(this.props.message);
            SnackbarHeight = "48px";
        }

        // wrap message lines in <p>
        message = message.map((msg, index) => <p className="SnackBar-message-line" key={index}>{msg}</p>);

        return {message, SnackbarHeight};
    }

    setPosition() {
        const style = {};
        const offset = "10px";
        switch(this.props.position) {
            case "top-left":
            style.top = offset;
            style.left = offset;
            break;

            case "top-right":
            style.top = offset;
            style.right = offset;
            break;
            
            case "bottom-right":
            style.bottom = offset;
            style.right = offset;
            break;
            
            default:
            case "bottom-left":
            style.bottom = offset;
            style.left = offset;
            break;
        }
        return style;
    }

    render() {
        const { message, SnackbarHeight } = this.generateMessage();

        // const dismissButtonPaddingLeftRight = "8px";
        // const dismissButtonPaddingTopBottom = "6px";

        
        let style = {
            display: this.state.visible ? "flex" : "none",
            // display: this.state.visible ? "flex" : {animationName: "dismissSnackBar", animationDuration: "1s"},
            // background: GRADIENTS[this.props.background],
            height: SnackbarHeight,
        };

        style = Object.assign(style, this.setPosition());

        // const messageStyle = {
        //     color: this.props.messageColor,
        // };

        const dissmissLabelStyle = {
            color: this.props.dismissLabelColor,
        };

        return (
            <div className="SnackBar" style={style}>
                <div className="SnackBar-message">
                    {message}
                </div>
                <label className="SnackBar-button" onClick={this.handleClick} style={dissmissLabelStyle}>
                    {this.props.dismissLabel}
                </label> 
            </div> 
        );
    }

    componentDidMount() {
        setTimeout(this.onClickDismiss, this.props.timeout);
    }

}


SnackBar.defaultProps = {
    dismissLabel: "DISMISS",
    visible: true,
    timeout: 5000,
    message: "NOTIFICATION!",
    position: "bottom-left",
    background: "grey",
    messageColor: "white",
    dismissLabelColor: "red",
};

SnackBar.propTypes = {
    visible: PropTypes.bool,
    timeout: PropTypes.number,
    dismissLabel: PropTypes.string,
    message: PropTypes.string,
    position: PropTypes.oneOf("bottom-left", "bottom-right", "top-left", "top-right"),
    background: PropTypes.oneOf(Object.keys(GRADIENTS)),
    messageColor: PropTypes.oneOf(Object.keys(COLORS)),
    dismissLabelColor: PropTypes.oneOf(Object.keys(COLORS)),
    handleClick: PropTypes.func,
};

export default SnackBar;
