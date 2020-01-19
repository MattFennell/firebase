import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import defaultStyles from './CommentInfo.module.scss';

const CommentInfo = props => (
    <>
        <div className={props.styles.metaData}>
            <div className={props.styles.author}>
                {props.displayName}
            </div>
            <div className={props.styles.date}>
                15 days ago
            </div>

        </div>
        <div className={props.styles.commentMessage}>
            {props.message}
        </div>
        {props.isTopLevel
            && (
                <div
                    role="button"
                    tabIndex={0}
                    className={props.styles.reply}
                    onClick={props.setReplyOpen}
                >
                Reply
                </div>
            ) }
    </>
);

CommentInfo.defaultProps = {
    displayName: '',
    isTopLevel: false,
    message: '',
    setReplyOpen: noop,
    styles: defaultStyles
};

CommentInfo.propTypes = {
    displayName: PropTypes.string,
    isTopLevel: PropTypes.bool,
    message: PropTypes.string,
    setReplyOpen: PropTypes.func,
    styles: PropTypes.objectOf(PropTypes.string)
};

export default CommentInfo;
