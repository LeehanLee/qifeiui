import React, { Component } from 'react';

class PrimaryItem extends Component {
    render() {
        const { index, text , href, isActive } = this.props;
        const className = isActive ? "item active" : "item";
        return (
            <a className={className} href={`#/${href}`} onClick={this.props.handleClick}>{text}</a>
        );
    }
}
export default PrimaryItem;