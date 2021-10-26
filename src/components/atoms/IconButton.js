import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames'
import * as Icons from 'react-icons/all'

const IconButton = (props) => {
    const {iconName, className, children, ...restProps} = props;
    const Icon = Icons[iconName];
    console.log(iconName,Icon )
    return (
        <button className={cx('btn', props.className)} {...restProps}>
            {/*<i className={cx('bi', `bi-${icon}`)}></i>*/}
            <Icon/>
            {children}
        </button>
    );
}

export default IconButton;