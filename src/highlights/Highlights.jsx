import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultStyles from './Highlights.module.scss';
import StyledButton from '../common/StyledButton/StyledButton';
import {
    closeHighlightError, submitHighlightRequest, submitHighlightError, fetchHighlightsRequest,
    upvoteHighlightRequest, downvoteHighlightRequest, fetchUserHighlightsToBeApprovedRequest,
    fetchRejectedHighlightsRequest
} from './actions';
import ErrorModal from '../common/modal/ErrorModal';
import YouTubeList from '../common/youtubelist/YouTubeList';
import SubmitVideo from './SubmitVideo';
import RadioButton from '../common/radio/RadioButton';
import * as helpers from './helpers';

const Highlights = props => {
    useEffect(() => {
        props.fetchHighlightsRequest();
    }, []);

    const [submitVideoOpen, setSubmitVideoOpen] = useState(false);
    const [filterBy, setFilterBy] = useState('allTime');
    const [sortBy, setSortBy] = useState('newestFirst');
    const openSubmitVideo = useCallback(() => {
        setSubmitVideoOpen(true);
    }, [setSubmitVideoOpen, submitVideoOpen]);

    return (
        <>
            <div className={props.styles.highlightsHeader}>
                <div>
                    <div className={props.styles.highlightsMessage}>
                  Highlights
                    </div>
                    <div className={props.styles.openSubmitVideo}>
                        <StyledButton onClick={openSubmitVideo} text="Click here to submit a video / See your existing requests" color="primary" />
                    </div>
                </div>
                <div className={props.styles.sortByWrapper}>
                    <div>
                        <RadioButton
                            radioLabel="Filter By Date"
                            onChange={setFilterBy}
                            options={Object.values(helpers.dateFilters).map(x => ({
                                radioLabel: x.label,
                                value: x.id
                            }))}
                            value={filterBy}
                        />
                    </div>
                    <div>
                        <RadioButton
                            radioLabel="Sort By"
                            onChange={setSortBy}
                            options={Object.values(helpers.sortByFilters).map(x => ({
                                radioLabel: x.label,
                                value: x.id
                            }))}
                            value={sortBy}
                        />
                    </div>
                </div>
            </div>
            <YouTubeList
                authId={props.auth.uid}
                downvoteHighlightRequest={props.downvoteHighlightRequest}
                loading={props.loadingVideos}
                videos={helpers.sortVideos(filterBy, sortBy, props.videos)}
                votingPage
                upvoteHighlightRequest={props.upvoteHighlightRequest}
            />
            <SubmitVideo
                closeSubmitVideo={() => setSubmitVideoOpen(false)}
                fetchRejectedHighlightsRequest={props.fetchRejectedHighlightsRequest}
                fetchUserHighlightsToBeApproved={props.fetchUserHighlightsToBeApproved}
                loadingVideosToBeApproved={props.loadingVideosToBeApproved}
                loadingRejectedVideos={props.loadingRejectedVideos}
                submitVideoOpen={submitVideoOpen}
                submitHighlightRequest={props.submitHighlightRequest}
                submitHighlightError={props.submitHighlightError}
                videosToBeApproved={props.videosToBeApproved}
                videosRejected={props.videosRejected}
                myVideos={props.videos.filter(x => x.userId === props.auth.uid)}
            />
            <ErrorModal
                closeModal={props.closeHighlightError}
                headerMessage="Submit Highlight Error"
                isOpen={props.highlightError.length > 0}
                errorCode={props.highlightErrorCode}
                errorMessage={props.highlightError}
            />
        </>
    );
};

Highlights.defaultProps = {
    auth: '',
    highlightError: '',
    highlightErrorCode: '',
    loadingVideos: false,
    loadingVideosToBeApproved: false,
    loadingRejectedVideos: false,
    styles: defaultStyles,
    videos: [],
    videosToBeApproved: [],
    videosRejected: []
};

Highlights.propTypes = {
    auth: PropTypes.shape({
        uid: PropTypes.string
    }),
    closeHighlightError: PropTypes.func.isRequired,
    downvoteHighlightRequest: PropTypes.func.isRequired,
    loadingVideosToBeApproved: PropTypes.bool,
    loadingRejectedVideos: PropTypes.bool,
    fetchHighlightsRequest: PropTypes.func.isRequired,
    fetchRejectedHighlightsRequest: PropTypes.func.isRequired,
    fetchUserHighlightsToBeApproved: PropTypes.func.isRequired,
    highlightError: PropTypes.string,
    highlightErrorCode: PropTypes.string,
    loadingVideos: PropTypes.bool,
    styles: PropTypes.objectOf(PropTypes.string),
    submitHighlightError: PropTypes.func.isRequired,
    submitHighlightRequest: PropTypes.func.isRequired,
    videos: PropTypes.arrayOf(PropTypes.shape({})),
    videosToBeApproved: PropTypes.arrayOf(PropTypes.shape({})),
    videosRejected: PropTypes.arrayOf(PropTypes.shape({})),
    upvoteHighlightRequest: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    closeHighlightError,
    downvoteHighlightRequest,
    fetchRejectedHighlightsRequest,
    fetchHighlightsRequest,
    fetchUserHighlightsToBeApproved: fetchUserHighlightsToBeApprovedRequest,
    submitHighlightError,
    submitHighlightRequest,
    upvoteHighlightRequest
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    highlightError: state.highlights.submitLinkError,
    highlightErrorCode: state.highlights.submitLinkErrorCode,
    loadingVideos: state.highlights.loadingVideos,
    loadingVideosToBeApproved: state.highlights.loadingVideosToBeApproved,
    loadingRejectedVideos: state.highlights.loadingRejectedVideos,
    videos: state.highlights.videos,
    videosToBeApproved: state.highlights.videosToBeApproved,
    videosRejected: state.highlights.videosRejected
});

export default connect(mapStateToProps, mapDispatchToProps)(Highlights);